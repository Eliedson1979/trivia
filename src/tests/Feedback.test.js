import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import token from './mocks/tokenMock';
import questions from './mocks/questionsMock';

describe('Testes com a tela de Feedback', () => {
  afterEach(() => window.localStorage.clear());

  it('Verifica se Could be better aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/feedback');

    const badFeedback = screen.getByText(/Could be better/i);
    expect(badFeedback).toBeInTheDocument();
  });

  it('Verifica se aparece "1 Right answer"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player: { assertions: 1, name: 'Boom', score: 3, gravatarEmail: '' },
    });
    history.push('/feedback');

    const oneAnswer = screen.getByText(/1 right answer/i);
    expect(oneAnswer).toBeInTheDocument();
  });

  it('Verifica se Well Done aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player: { assertions: 3, name: 'Aloha', score: 3, gravatarEmail: '' },
    });
    history.push('/feedback');

    const goodFeedback = screen.getByText(/Well Done/i);
    expect(goodFeedback).toBeInTheDocument();
  });

  it('Testando o button Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const buttonPlayAgain = screen.getByText(/Play Again/i);
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testando o button Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const buttonRanking = screen.getByText(/Ranking/i);
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
