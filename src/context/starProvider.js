import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starContext from './starContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsfiltrados, setPlanetsfiltrados] = useState([]);
  const [search, setSearch] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filter, setFilter] = useState({
    filterByNumericValues: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  });
  const [totalFilters, setAddFilter] = useState({
    allFilterByNumericValues: [],
  });
  const [listColumn, setColumn] = useState(
    ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'],
  );

  async function getPlanets() {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const infoPlanets = data.results;
        infoPlanets.map((planet) => delete planet.residents);
        setPlanets(infoPlanets);
        setPlanetsfiltrados(infoPlanets);
      });
  }

  useEffect(() => {
    getPlanets();
  }, []);

  function handlerNamePlanet(text) {
    setSearch({
      filterByName: {
        name: text.value,
      },
    });
  }

  function handlerValueComparison({ target }) {
    setFilter({
      filterByNumericValues: {
        ...filter.filterByNumericValues,
        comparison: target.value,
      },
    });
  }

  function handlerValueColumn({ target }) {
    setFilter({
      filterByNumericValues: {
        ...filter.filterByNumericValues,
        column: target.value,
      },
    });
  }

  function handlerValueNumber(text) {
    setFilter({
      filterByNumericValues: {
        ...filter.filterByNumericValues,
        value: text.value,
      },
    });
  }

  function filterPlanets(newTotal) {
    let planetasretorno = planets;
    for (let i = 0; i < newTotal.length; i += 1) {
      const comparison1 = newTotal[i].comparison;
      const column1 = newTotal[i].column;
      const value1 = newTotal[i].value;
      const planetsFil = planetasretorno.filter((planet) => {
        if (comparison1 === 'igual a') {
          return Number(planet[column1]) === Number(value1);
        } if (comparison1 === 'maior que') {
          return planet[column1] > Number(value1);
        } if (comparison1 === 'menor que') {
          return planet[column1] < Number(value1);
        }
        return planet;
      });
      planetasretorno = planetsFil;
    }
    return planetasretorno;
  }

  function handlerSubmitFilter(event) {
    event.preventDefault();
    const { column, comparison, value } = filter.filterByNumericValues;
    const totalFiltros = {
      column,
      comparison,
      value,
    };
    const newTotal = totalFilters.allFilterByNumericValues;
    newTotal.push(totalFiltros);
    setAddFilter({
      allFilterByNumericValues: newTotal,
    });
    const planetasretorno = filterPlanets(newTotal);
    setPlanetsfiltrados(planetasretorno);
    const allSetfilters = listColumn.filter((element) => element !== column);
    setColumn(allSetfilters);
    setFilter({
      filterByNumericValues: {
        ...filter.filterByNumericValues,
        column: allSetfilters[0],
        comparison: 'maior que',
      },
    });
  }

  function handlerExcluirFilter(index) {
    const { allFilterByNumericValues } = totalFilters;
    const opaaaaaaa = allFilterByNumericValues
      .filter((ele) => ele.column !== allFilterByNumericValues[index].column
        && ele.comparison !== allFilterByNumericValues[index].comparison
        && ele.value !== allFilterByNumericValues[index].value);
    setAddFilter({
      allFilterByNumericValues: opaaaaaaa,
    });
    const newTotal = opaaaaaaa;
    if (newTotal === []) {
      setPlanetsfiltrados(planetasretorno);
    } else {
      const planetasretorno = filterPlanets(newTotal);
      setPlanetsfiltrados(planetasretorno);
    }
    listColumn.push(allFilterByNumericValues[index].column);
    setColumn(listColumn);
  }

  function handlerExcluirFilterAll() {
    setPlanetsfiltrados(planets);
    setColumn(
      ['population', 'orbital_period',
        'diameter', 'rotation_period', 'surface_water'],
    );
    setAddFilter({
      allFilterByNumericValues: [],
    });
  }

  const context = {
    planetsfiltrados,
    search,
    handlerNamePlanet,
    handlerValueNumber,
    handlerValueColumn,
    handlerSubmitFilter,
    handlerValueComparison,
    handlerExcluirFilter,
    handlerExcluirFilterAll,
    filter,
    listColumn,
    totalFilters,
  };

  return (
    <starContext.Provider
      value={ context }
    >
      { children }
    </starContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

// toda logica está aqui

export default Provider;
