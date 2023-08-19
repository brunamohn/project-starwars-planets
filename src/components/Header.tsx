import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/planets-context';

function Header() {
  const [searchPlanets, setSearchPlanets] = useState('');
  const { searchedPlanets } = useContext(PlanetsContext);

  const handleChange = (e: any) => {
    const search = (e.target.value).toLowerCase();
    setSearchPlanets(search);
  };

  useEffect(() => {
    searchedPlanets(searchPlanets);
  }, [searchPlanets]);

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        value={ searchPlanets }
        onChange={ (e) => handleChange(e) }
      />
    </div>
  );
}

export default Header;
