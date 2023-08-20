import { createContext } from 'react';
import { PlanetsType } from '../types/types';

export type PlanetsContextType = {
  planets: PlanetsType[],
  searchedPlanets: (value: string) => void,
  planetsSearched: PlanetsType[],
  filterFeatures: (value: any) => void,
  filtersOnScreen: string[],
  allFilters: any,
  setAllFilters: (value: any) => void,
  setFiltersOnScreen: (value: string[]) => void,
};

export const PlanetsContext = createContext({} as PlanetsContextType);
