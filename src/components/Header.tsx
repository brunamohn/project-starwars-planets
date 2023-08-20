import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/planets-context';

const INICIAL_STATE = {
  column: 'population',
  operator: 'maior que',
  number: '0',
};

function Header() {
  const [searchPlanets, setSearchPlanets] = useState('');
  const [form, setForm] = useState(INICIAL_STATE);
  const { searchedPlanets, filterFeatures } = useContext(PlanetsContext);

  const handleChange = (e: any) => {
    const search = (e.target.value).toLowerCase();
    setSearchPlanets(search);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newSerch = {
      column: form.column,
      operator: form.operator,
      value: form.number,
    };
    filterFeatures(newSerch);
    setForm(INICIAL_STATE);
  };

  useEffect(() => {
    searchedPlanets(searchPlanets);
  }, [searchPlanets]);

  return (
    <main>
      <div>
        <h1>Projeto Star Wars - Trybe</h1>
        <input
          type="text"
          data-testid="name-filter"
          value={ searchPlanets }
          onChange={ (e) => handleChange(e) }
        />
      </div>
      <form onSubmit={ handleSubmit }>
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          value={ form.column }
          onChange={ (e) => setForm({ ...form, column: e.target.value }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="operator"
          id="operator"
          data-testid="comparison-filter"
          value={ form.operator }
          onChange={ (e) => setForm({ ...form, operator: e.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="number"
          data-testid="value-filter"
          value={ form.number }
          onChange={ (e) => setForm({ ...form, number: e.target.value }) }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
    </main>
  );
}

export default Header;
