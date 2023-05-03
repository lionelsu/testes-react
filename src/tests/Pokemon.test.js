import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes para o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser exibido na tela', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /Pikachu sprite/i });

    expect(name).toHaveTextContent(/pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/average weight: 6\.0 kg/i);
    expect(image).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Deve ter um link de navegação para a página de detalhes dentro do card do Pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    expect(details).toHaveAttribute('href', '/pokemon/25');
  });

  it('Deve exibir a página de detalhes do pokémon ao clicar no link More Details', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Deve exibir a URL no navegador com o /pokemon/id ao clicar no link More Details', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);

    expect(history.location.pathname).toBe('/pokemon/25');
  });

  it('Deve existir um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);

    const favoriteBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteBox);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favoriteLink);

    const starIcon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
