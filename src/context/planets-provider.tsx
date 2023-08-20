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
    };
    planetsFetch();
  }, [planetsResult]);

  const searchedPlanets = (search: string) => {
    const filteredPlanets: PlanetsType[] = planetsResult.filter(
      (planet) => planet.name.toLowerCase().includes(search),
    );
    setPlanetsSearched(filteredPlanets);
  };

  const filterFeatures = (
    search: { column: keyof PlanetsType, operator: string, value: number },
  ) => {
    const { column, operator, value } = search;
    const filteredPlanets: PlanetsType[] = planetsResult.filter((planet) => {
      if (operator === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (operator === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      if (operator === 'igual a') {
        return Number(planet[column]) === Number(value);
      }
      return planet;
    });
    setPlanetsSearched(filteredPlanets);
  };

  return (
    <PlanetsContext.Provider
      value={
          { planets: planetsResult, searchedPlanets, planetsSearched, filterFeatures }
      }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
