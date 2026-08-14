import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas';
import { z } from 'zod';
import { useAuth } from '../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Building2, ShieldCheck, Sparkles, Lock } from 'lucide-react';

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'sarah.j@grandpalace.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#173B63] to-[#5B5BD6] text-white flex items-center justify-center font-extrabold text-2xl mx-auto shadow-md mb-4">
            M
          </div>
          <h1 className="text-2xl font-bold text-[#17202A] tracking-tight">MTS-AI-MOS</h1>
          <p className="text-sm text-[#667085] mt-1 font-medium">Marketing Technology System – AI Operating System</p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl border border-[#E4E7EC] p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#17202A]">Enterprise Sign In</h2>
            <p className="text-xs text-[#667085] mt-1">Access your brand workspace & marketing intelligence</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-[#E4E7EC] text-[#173B63] focus:ring-[#173B63]"
                  {...register('rememberMe')}
                />
                <span className="text-[#667085]">Remember me</span>
              </label>
              <a href="#" className="text-[#173B63] font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In to Workspace
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E4E7EC] text-center text-xs text-[#667085]">
            Need access?{' '}
            <a href="#" className="text-[#173B63] font-semibold hover:underline">
              Contact Administrator
            </a>
          </div>
        </div>

        {/* Enterprise Footer */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#667085]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16855B]" /> ISO 27001 Certified
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#173B63]" /> Enterprise SSO
          </span>
        </div>
      </div>
    </div>
  );
};
