import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import token from './mocks/tokenMock';
import questions from './mocks/questionsMock';

describe('Testes com a tela de Ranking', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se quando clicar no botão home leva para pagina principal', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btn = screen.getByTestId('btn-go-home');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se a ordem do score é decrescente aos pontos', async () => {
    localStorage.clear();
    const ranking = [
      {
        "name": "Marcus",
        "score": 300,
        "picture": "https://www.gravatar.com/avatar/487bef338bbfa4e4837d14699983d384"
      },
      {
        "name": "Lauro",
        "score": 76,
        "picture": "https://www.gravatar.com/avatar/487bef338bbfa4e4837d14699983d384"
      },
      {
        "name": "Jesus",
        "score": 7600,
        "picture": "https://www.gravatar.com/avatar/487bef338bbfa4e4837d14699983d384"
      }
    ]

    localStorage.setItem('ranking', JSON.stringify(ranking));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking')

    const marcus = screen.getByTestId('player-name-1');
    const lauro = screen.getByTestId('player-name-2');
    const jesus = screen.getByTestId('player-name-0');
    expect(marcus).toHaveTextContent('Marcus');
    expect(lauro).toHaveTextContent('Lauro');
    expect(jesus).toHaveTextContent('Jesus')
  });
});
