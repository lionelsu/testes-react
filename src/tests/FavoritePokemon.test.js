import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testes para o componente <FavoritePokemon.js />', () => {
  it('Deve exibir a mensagem No favorite pokemon found, caso não tenha nenhum pokémon favoritado', () => {
    renderWithRouter(<FavoritePokemon />);
    const message = screen.getByText(/No favorite Pokémon found/i);

    expect(message).toBeInTheDocument();
  });

  it('Testa se são exibidos os pokémon favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);

    const favoriteBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteBox);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favoriteLink);

    const pikachu = {
      name: /pikachu/i,
      type: /electric/i,
      weight: /6\.0 kg/i,
    };

    Object.values(pikachu).forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
