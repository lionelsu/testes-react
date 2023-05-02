import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testes para o componente <About.js />', () => {
  it('Deve renderizar as informações sobre a Pokédex na página', () => {
    renderWithRouter(<About />);
    const pokedex = screen.getByRole('heading', { name: /pokédex/i });

    expect(pokedex).toBeInTheDocument();
  });

  it('Deve conter um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: /about pokédex/i });

    expect(h2).toBeInTheDocument();
  });

  it('Deve conter dois parágrafos com os textos sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const p2 = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Deve conter uma imagem de uma pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: /pokédex/i });

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
