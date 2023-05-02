import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testes para o componente <NotFound.js />', () => {
  it('Deve conter um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
  });

  it('Deve mostrar uma imagem com a url correta', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', { name: /Pikachu crying because the page requested was not found/i });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
