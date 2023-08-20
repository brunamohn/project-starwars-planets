import { createContext } from 'react';
import { PlanetsType } from '../types/types';

export type PlanetsContextType = {
  planets: PlanetsType[],
  searchedPlanets: (value: string) => void,
  planetsSearched: PlanetsType[],
  filterFeatures: (value: any) => void,
};

export const PlanetsContext = createContext({} as PlanetsContextType);
