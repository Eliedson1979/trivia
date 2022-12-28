import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import invalidToken from './mocks/invalidTokenMock';
import questions from './mocks/questionsMock';
import emptyQuestions from './mocks/emptyQuestionsMock';
import App from '../App';
import { saveStorage } from '../services/localStorage';

describe('Testes com a tela de Game', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Redireciona aos feedbacks caso respondido todas as perguntas ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    saveStorage(
      'options',
      JSON.stringify({
        category: 'Any category',
        difficulty: 'Any difficulty',
        type: 'Any Type',
        quantity: '5',
      }));
    history.push('/game');

    const MAX_QUESTIONS = 5;
    for (let question = 0; question < MAX_QUESTIONS; question += 1) {
      const btn = await screen.findByTestId('correct-answer');
      expect(btn).toBeInTheDocument();
      userEvent.click(btn);

      const nextBtn = screen.getByTestId('btn-next');
      expect(nextBtn).toBeInTheDocument();
      userEvent.click(nextBtn);
    }

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  });

  it('Testa se o score não é somado caso não acerte a questão', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    const btn = await screen.findAllByTestId(/wrong-answer-/i);
    userEvent.click(btn[0]);

    const score = screen.getByTestId('header-score');
    expect(score).toHaveTextContent('0');
  })

  it('Testa se redireciona para home caso token seja inválido', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidToken),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    let emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(nameInput, 'Albert');
    userEvent.click(playBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(emptyQuestions),
    });

    URL = 'https://opentdb.com/api.php?amount=5&token=hue&category=&difficulty=&type=';
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(URL));         

    const { pathname } = history.location;
    emailInput = screen.getByTestId('input-gravatar-email');

    expect(pathname).toBe('/');
    expect(emailInput).toHaveValue('');
  });

  it('Testa se o botão é desativado após 30 segundos sem responder a pergunta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitFor(
      () => expect(screen.getByTestId('correct-answer')).toBeDisabled(),
      { timeout: 35000 }
    );
  }, 40000);
});
