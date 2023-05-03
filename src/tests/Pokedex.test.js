import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Testes para o componente <Pokedex.js />', () => {
  it('Deve conter um h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(h2).toBeInTheDocument();
  });

  it('Deve ser exibido o próxmo pokémon ao clicar no botão Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const next = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(next);

    expect(screen.getByText(pokemonList[1].name)).toBeInTheDocument();
  });

  it('Deve conter um botão com o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const next = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(next).toBeInTheDocument();
  });

  it('Cada pokemon deve ser mostrado, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);

    let pkmIndex = 0;
    let pokemon = pokemonList[pkmIndex];
    const next = screen.getByRole('button', { name: /Próximo Pokémon/i });

    let pokemonName = screen.getByText(pokemon.name);
    for (let i = 1; i < pokemonList.length; i += 1) {
      pkmIndex += 1;
      if (pkmIndex >= pokemonList.length) {
        pkmIndex = 0;
      }
      pokemon = pokemonList[pkmIndex];

      userEvent.click(next);
      pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
    }
  });

  it('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
    renderWithRouter(<App />);

    const types = pokemonList.map((pokemon) => pokemon.type);
    const uniqueTypes = [...new Set(types)];
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    expect(buttonTypes).toHaveLength(uniqueTypes.length);
  });

  it('Deve circular apenas no tipo do pokémon selecionado e o botão All deve sempre estar visível durante a filtragem', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /All/i });
    const next = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const types = pokemonList.map((pokemon) => pokemon.type);
    const uniqueTypes = [...new Set(types)];
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    buttonTypes.forEach((btn, index) => {
      userEvent.click(btn);

      pokemonList
        .filter(({ type }) => uniqueTypes[index] === type)
        .forEach(({ name }) => {
          expect(screen.getByText(name)).toBeInTheDocument();
          userEvent.click(next);
          expect(all).toBeVisible();
        });
    });
  });

  it('Deve ser possível resetar qualquer filtro ao apertar o botão All', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();

    const fire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fire);

    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(all);
    const next = screen.getByRole('button', { name: /Próximo Pokémon/i });
    pokemonList.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(next);
    });
  });
});
