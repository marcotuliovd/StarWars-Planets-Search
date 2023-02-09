import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './mockData';

test('test filter value', async () => {
  global.fetch = jest.fn(async () => ({ json: async () => mockData }));
  render(<App />);
  const selectColumn = screen.getByTestId('column-filter');
  expect(selectColumn).toBeInTheDocument();
  userEvent.selectOptions(selectColumn, 'diameter')

  const inputValue = screen.getByTestId('value-filter');
  expect(inputValue).toBeInTheDocument();
  userEvent.paste(inputValue, '9000')

  const buttonFiltar = screen.getByTestId('button-filter');
  expect(buttonFiltar).toBeInTheDocument();
  userEvent.click(buttonFiltar);

  const filtro = screen.getByTestId('filter');
  expect(filtro).toBeInTheDocument();

  const removerFilters = screen.getByTestId('button-remove-filters');
  expect(removerFilters).toBeInTheDocument();
  userEvent.click(removerFilters)

  expect(filtro).not.toBeInTheDocument();

  expect(inputValue).toBeInTheDocument();
  userEvent.paste(inputValue, '100000')

  const selectComparison = screen.getByTestId('comparison-filter');
  expect(selectComparison).toBeInTheDocument();
  userEvent.selectOptions(selectComparison, 'menor que')

  userEvent.click(buttonFiltar);

  const excluir = screen.getByTestId('excluir-este-filtro');
  expect(excluir).toBeInTheDocument();
  userEvent.click(excluir);

  expect(filtro).not.toBeInTheDocument();

  userEvent.click(removerFilters)

  userEvent.selectOptions(selectComparison, 'igual a')
  userEvent.selectOptions(selectColumn, 'surface_water')
  userEvent.paste(inputValue, '23')

  userEvent.click(buttonFiltar);

  const Tatooine = await screen.findByText('Tatooine');
  expect(Tatooine).toBeInTheDocument();

  expect(removerFilters).toBeInTheDocument();
  userEvent.click(removerFilters)

  userEvent.click(buttonFiltar);

  userEvent.selectOptions(selectComparison, 'igual a')
  userEvent.selectOptions(selectColumn, 'surface_water')
  userEvent.paste(inputValue, '23')
  userEvent.click(buttonFiltar);

});