import React, { useContext } from 'react';
import starContext from '../context/starContext';

function FilterValue() {
  const { handlerValueNumber, handlerValueColumn, handlerValueComparison,
    handlerSubmitFilter, filter, listColumn, totalFilters,
    handlerExcluirFilter, handlerExcluirFilterAll } = useContext(starContext);
  const listComparison = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <form
        onSubmit={ (event) => handlerSubmitFilter(event) }
      >
        <select
          data-testid="column-filter"
          onChange={ (event) => handlerValueColumn(event) }
          name="column"
        >
          { listColumn.map((column) => (
            <option
              key={ column }
            >
              { column }
            </option>
          )) }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => handlerValueComparison(event) }
          name="comparison"
        >
          { listComparison.map((comparison) => (
            <option
              key={ comparison }
            >
              { comparison }
            </option>
          )) }
        </select>
        <input
          type="number"
          value={ filter.filterByNumericValues.value }
          data-testid="value-filter"
          onChange={ ({ target }) => handlerValueNumber(target) }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      {totalFilters.allFilterByNumericValues.map((filtro, index) => (
        <div
          data-testid="filter"
          key={ index }
        >
          <p>
            {filtro.column}
            {' '}
            {filtro.comparison}
            {' '}
            {filtro.value}
            {' '}
          </p>
          <button
            data-testid="excluir-este-filtro"
            type="button"
            onClick={ () => handlerExcluirFilter(index) }
          >
            excluir
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => handlerExcluirFilterAll() }
      >
        Remover todos os filtros
      </button>
    </div>
  );
}

export default FilterValue;
