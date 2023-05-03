import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes para o componente PokémonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    expect(details).not.toBeInTheDocument();
  });
  it('Deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const pokemonDetails = screen.getByText(/Pikachu Details/i);
    expect(pokemonDetails).toBeInTheDocument();
  });

  // it('Não deve existir um link de detalhes no Pokémon selecionado', () => {
  //   renderWithRouter(<App />);

  //   const details = screen.getByRole('link', { name: /More details/i });
  //   expect(details).not.toBeInTheDocument();
  // });

  it('Deve conter, na tela de detalhes, um heading h2 com o texto Summary', () => {
    const summary = screen.getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('Deve conter, na seção de detalhes, um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    const resume = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);

    expect(resume).toBeInTheDocument();
  });

  it('Deve existir na seção de detalhes um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    const locations = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(locations).toBeInTheDocument();
  });

  it('Devem ser exibidas todas as localizações na seção de detalhes do pokémon específico', () => {
    const kantoViridian = screen.getByText(/Kanto Viridian Forest/i);
    const kantoPowerPlant = screen.getByText(/Kanto Power Plant/i);

    expect(kantoViridian).toBeInTheDocument();
    expect(kantoPowerPlant).toBeInTheDocument();
  });

  it('Devem ser exibidos o nome e uma imagem do mapa de cada localização onde a imagem  deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.', () => {
    const pikachuLocation = screen.getAllByRole('img', { name: /Pikachu location/i });

    const pikachuImg = ['https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png'];
    pikachuLocation.forEach((img, index) => {
      expect(img).toHaveProperty('alt', 'Pikachu location');
      expect(img).toHaveAttribute('src', pikachuImg[index]);
    });
  });

  it('Deve existir um checkbox que permite favoritar o Pokémon na página de detalhes', () => {
    const favoriteBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteBox).toBeInTheDocument();
  });

  it('Cliques alternativos no checkbox da página de detalhes devem alterar o estado do Pokémon favoritado', () => {
    const favoriteBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteBox).not.toBeChecked();

    userEvent.click(favoriteBox);
    expect(favoriteBox).toBeChecked();

    const starIcon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();

    userEvent.click(favoriteBox);
    expect(favoriteBox).not.toBeChecked();
    expect(starIcon).not.toBeInTheDocument();
  });
});
