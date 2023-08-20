import { useEffect, useState } from 'react';
import { PlanetsContext } from './planets-context';
import { PlanetsType } from '../types/types';
import fetchPlanets from '../fetch/fetchPlanets';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

type FiltersType = {
  column: keyof PlanetsType,
  operator: string,
  value: number,
};

const INICIAL_STATE_FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planetsResult, setPlanetsResult] = useState<PlanetsType[]>([]);
  const [planetsSearched, setPlanetsSearched] = useState<PlanetsType[]>([]);
  const [allFilters, setAllFilters] = useState<FiltersType[]>([]);
  const [filtersOnScreen, setFiltersOnScreen] = useState(INICIAL_STATE_FILTERS);

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
    setAllFilters([...allFilters, search]);
    const newFiltersList = filtersOnScreen.filter((filter) => filter !== search.column);
    setFiltersOnScreen(newFiltersList);
  };

  useEffect(() => {
    let shownPlanets = planetsResult;
    allFilters.forEach((filter) => {
      if (filter.operator === 'maior que') {
        shownPlanets = shownPlanets.filter(
          (planet) => Number(planet[filter.column]) > Number(filter.value),
        );
      }
      if (filter.operator === 'menor que') {
        shownPlanets = shownPlanets.filter(
          (planet) => Number(planet[filter.column]) < Number(filter.value),
        );
      }
      if (filter.operator === 'igual a') {
        shownPlanets = shownPlanets.filter(
          (planet) => Number(planet[filter.column]) === Number(filter.value),
        );
      }
      return shownPlanets;
    });
    setPlanetsSearched(shownPlanets);
  }, [allFilters, planetsResult]);

  return (
    <PlanetsContext.Provider
      value={
        { planets: planetsResult,
          searchedPlanets,
          planetsSearched,
          filterFeatures,
          filtersOnScreen }
      }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
