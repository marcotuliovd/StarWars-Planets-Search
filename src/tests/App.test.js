import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './mockData';

test('I am your test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello App!/i);
  expect(linkElement).toBeInTheDocument();
});


test('search planets', async () => {
  global.fetch = jest.fn(async () => ({ json: async () => mockData }));
  render(<App />);
  const inputNamePlanet = screen.getByTestId('name-filter');
  expect(inputNamePlanet).toBeInTheDocument();
  userEvent.paste(inputNamePlanet, 'oo')
  const Tatooine = await screen.findByText('Tatooine');
  expect(Tatooine).toBeInTheDocument();
});
