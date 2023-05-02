import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes para o componente <App.js />', () => {
  it('Deve possuir um conjunto fixo de links no topo da navegação, o primeiro deve ser Home, o segundo About e o terceiro Favorite Pokémon', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();

    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favorite).toBeInTheDocument();
  });

  it('Deve ser redirecionado para a página inicial quando o usuário clica no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    expect(history.location.pathname).toBe('/');
  });

  it('Deve ser redirecionado para a página About quando o usuário clica no link About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);

    expect(history.location.pathname).toBe('/about');
  });

  it('Deve ser redirecionado para a página Pokémon Favoritados quando o usuário clica no link Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favorite);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Deve ser redirecionado para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    const testes = '/pagina-qualquer';
    act(() => {
      history.push(testes);
    });

    const text = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(text).toBeInTheDocument();
    expect(history.location.pathname).toBe(testes);
  });
});
