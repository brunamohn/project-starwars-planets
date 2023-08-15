import { useEffect, useState } from 'react';
import { PlanetsContext } from './planets-context';
import { PlanetsType } from '../types/types';
import fetchPlanets from '../fetch/fetchPlanets';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planetsResult, setPlanetsResult] = useState<PlanetsType[]>([]);

  useEffect(() => {
    const planetsFetch = async () => {
      const response = await fetchPlanets();
      setPlanetsResult(response.results);
    };
    planetsFetch();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets: planetsResult } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
