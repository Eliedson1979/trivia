import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import token from './mocks/tokenMock';
import questions from './mocks/questionsMock';
import categories from './mocks/categoriesMock';
import App from '../App';

describe('Testes com a tela de Login', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Verifica se o formulário de Login aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();

    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();

    const inputBtn = screen.getByTestId('btn-play');
    expect(inputBtn).toBeInTheDocument();
  });

  it('Verifica se o botão do formulário inicia desativado', () => {
    renderWithRouterAndRedux(<App />);

    const inputBtn = screen.getByTestId('btn-play');
    expect(inputBtn).toBeDisabled();
  });

  it('Verifica se o botão é ativado ao preencher o formulário e ao clicar é enviado para página de game', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toHaveValue('');

    userEvent.type(emailInput, 'teste@teste.com');
    expect(emailInput).toHaveValue('teste@teste.com');

    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toHaveValue('');

    userEvent.type(nameInput, 'Albert');
    expect(nameInput).toHaveValue('Albert');

    const inputBtn = screen.getByTestId('btn-play');
    expect(inputBtn).toBeEnabled();

    userEvent.click(inputBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const profileName = await screen.findByTestId('header-player-name');
    expect(profileName).toBeInTheDocument();

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/game');
  });

  it('Verifica se o botão de configurações aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const configBtn = screen.getByRole('button', { name: /settings/i });
    expect(configBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de configurações é redirecionado para página de configurações', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categories),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    
    const configBtn = screen.getByRole('button', { name: /settings/i });
    expect(configBtn).toBeInTheDocument();
    
    userEvent.click(configBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/settings');
  });
});
