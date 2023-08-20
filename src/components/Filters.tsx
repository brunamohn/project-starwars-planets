import { Key, useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/planets-context';

const INICIAL_STATE_FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Filters() {
  const { allFilters,
    setAllFilters,
    setFiltersOnScreen } = useContext(PlanetsContext);

  useEffect(() => {
    const newFiltersList = INICIAL_STATE_FILTERS.filter(
      (filter) => !allFilters.some(
        (filters: { column: string; }) => filters.column === filter,
      ),
    );
    setFiltersOnScreen(newFiltersList);
  }, [allFilters, setFiltersOnScreen]);

  const handleRemoveFilter = (column: Key | null | undefined) => {
    const newFilters = allFilters.filter(
      (filter: { column: Key | null | undefined; }) => filter.column !== column,
    );
    setAllFilters(newFilters);
  };

  const handleRemoveAllFiltes = () => {
    setAllFilters([]);
    setFiltersOnScreen([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <div>
      {allFilters.map((filter:
      { column: Key | null | undefined; operator: any; value: any; }) => (
        <div data-testid="filter" key={ filter.column }>
          <p>
            {`${filter.column} ${filter.operator} ${filter.value}`}
          </p>
          <button
            type="button"
            onClick={ () => handleRemoveFilter(filter.column) }
          >
            Remover Filtro
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => handleRemoveAllFiltes() }
      >
        Remover todos os filtros
      </button>
    </div>
  );
}

export default Filters;
