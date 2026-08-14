import { BrandWorkspace, BrandDNA, Persona } from '../types';
import { mockBrandWorkspace, mockBrandDNA, mockPersonas } from '../mock/data';

let currentDna = { ...mockBrandDNA };
let currentPersonas = [...mockPersonas];

export const brandService = {
  async getWorkspace(): Promise<BrandWorkspace> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockBrandWorkspace;
  },

  async getBrandDNA(): Promise<BrandDNA> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return currentDna;
  },

  async updateBrandDNA(updatedDna: Partial<BrandDNA>): Promise<BrandDNA> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    currentDna = {
      ...currentDna,
      ...updatedDna,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    return currentDna;
  },

  async getPersonas(): Promise<Persona[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return currentPersonas;
  },

  async createPersona(personaData: Omit<Persona, 'id'>): Promise<Persona> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newPersona: Persona = {
      ...personaData,
      id: `persona_${Date.now()}`,
    };
    currentPersonas.unshift(newPersona);
    return newPersona;
  },
};
