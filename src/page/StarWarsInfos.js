import React from 'react';
import FilterName from '../components/FilterName';
import FilterValue from '../components/FilterValue';
import Table from '../components/Table';

function StarWarsInfos() {
  return (
    <main>
      <FilterName />
      <FilterValue />
      <Table />
    </main>
  );
}

export default StarWarsInfos;
