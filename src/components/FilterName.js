import React, { useContext } from 'react';
import starContext from '../context/starContext';

function FilterName() {
  const { handlerNamePlanet } = useContext(starContext);
  return (
    <div>
      <input
        type="text"
        placeholder="Nome do Planeta"
        data-testid="name-filter"
        onChange={ ({ target }) => handlerNamePlanet(target) }
      />
    </div>
  );
}

export default FilterName;
