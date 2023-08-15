import { createContext } from 'react';
import { PlanetsType } from '../types/types';

export type PlanetsContextType = {
  planets: PlanetsType[],
};

export const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
});
