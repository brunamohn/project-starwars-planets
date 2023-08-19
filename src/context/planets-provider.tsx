import { useEffect, useState } from 'react';
import { PlanetsContext } from './planets-context';
import { PlanetsType } from '../types/types';
import fetchPlanets from '../fetch/fetchPlanets';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planetsResult, setPlanetsResult] = useState<PlanetsType[]>([]);
  const [planetsSearched, setPlanetsSearched] = useState<PlanetsType[]>([]);

  useEffect(() => {
    const planetsFetch = async () => {
      const response = await fetchPlanets();
      setPlanetsResult(response.results);
      console.log(planetsResult);
    };
    planetsFetch();
  }, [planetsResult]);

  const searchedPlanets = (search: string) => {
    const filteredPlanets: PlanetsType[] = planetsResult.filter(
      (planet) => planet.name.toLowerCase().includes(search),
    );
    setPlanetsSearched(filteredPlanets);
    console.log(planetsSearched);
  };

  return (
    <PlanetsContext.Provider
      value={
          { planets: planetsResult, searchedPlanets, planetsSearched }
      }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
