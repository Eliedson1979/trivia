import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import App from '../App';
import categories from './mocks/categoriesMock';
import userEvent from '@testing-library/user-event';
import Settings from '../pages/Settings';

describe('Testes com a tela de Settings', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testa se a categoria é alterada após selecionar alguma outra', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categories),
    });
    renderWithRouterAndRedux(<Settings />);

    await waitFor(() => {
      const categoryInput = screen.getByLabelText(/category/i);
      expect(categoryInput).toBeInTheDocument();
    });

    const categoryInput = screen.getByLabelText(/category/i);
    userEvent.selectOptions(categoryInput, 'Animals');
    expect(categoryInput).toHaveValue('Animals');
  });

  it('Testa se a pagina renderiza a categoria escolhida quando recarregar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categories),
    });
    renderWithRouterAndRedux(<Settings />);

    await waitFor(() => {
      const categoryInput = screen.getByLabelText(/category/i);
      expect(categoryInput).toBeInTheDocument();
    });

    const categoryInput = screen.getByLabelText(/category/i);
    expect(categoryInput).toHaveValue('Animals');
  });

  it('Testa se, limpado o local storage, a pagina é carregada com os valores padrões', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categories),
    });
    const { history } = renderWithRouterAndRedux(<App />);

    window.localStorage.clear();
    history.push('/settings');

    await waitFor(() => {
      const categoryInput = screen.getByLabelText(/category/i);
      expect(categoryInput).toBeInTheDocument();
    });

    const categoryInput = screen.getByLabelText(/category/i);
    expect(categoryInput).toHaveValue('Any Category');
  })

  it('Testa se a dificuldade é alterada após selecionar alguma outra', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categories),
    });
    renderWithRouterAndRedux(<Settings />);

    await waitFor(() => {
      const categoryInput = screen.getByLabelText(/category/i);
      expect(categoryInput).toBeInTheDocument();
    });

    const difficultyInput = screen.getByLabelText(/difficulty/i);
    userEvent.selectOptions(difficultyInput, 'Hard');
    expect(difficultyInput).toHaveValue('Hard');
  });
});
