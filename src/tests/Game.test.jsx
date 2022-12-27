import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const { questionsResponse, invalidTokenQuestionsResponse } = require('../../cypress/mocks/questions');

describe('Checks for the Game page', () => {

  const initialState = {
    player: {
      name: 'Joao',
      assertions: 0,
      score: 0,
      gravatarEmail: 'https://www.gravatar.com/avatar/e8c7e13f9383093661b25d7fcca181d2'
    }
  }

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Checks if the Game page has the corresponding initial state', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { store, history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    const { location: { pathname } } = history
    expect(pathname).toBe('/game');
    expect(store.getState().player).toEqual(initialState.player);
  });

  it('Checks if the next button is rendered after the question is answered', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
  });

  it('Checks if clicking the next button displays the next question', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();

    userEvent.click(btnNext);

    const question = screen.getByTestId('question-text');
    expect(question).toHaveTextContent(questionsResponse.results[1].question);
  });

  it('Checks if you are redirected to the home page if the token is not valid', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const { location: { pathname } } = history
    expect(pathname).toBe('/')
  });

  it('Checks if when answering all questions, the user is redirected to the feedback page', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    let questionButton = screen.getByTestId('correct-answer');
    
    userEvent.click(questionButton)
    let btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext)

    questionButton = screen.getByTestId('correct-answer');
    userEvent.click(questionButton)
    btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext)

    questionButton = screen.getByTestId('correct-answer');
    userEvent.click(questionButton)
    btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext)

    questionButton = screen.getByTestId('correct-answer');
    userEvent.click(questionButton)
    btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext)

    questionButton = screen.getByTestId('correct-answer');
    userEvent.click(questionButton)
    btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext)

    const { location: { pathname } } = history
    expect(pathname).toBe('/feedback');
  });

  it('Test disabled buttons', async () => {
    renderWithRouterAndRedux(<App />)
    jest.useFakeTimers();
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(questionsResponse),
      }));
      const email = screen.getByTestId('input-gravatar-email');
      userEvent.type(email, 'teste@teste.com');

      const nome = screen.getByTestId('input-player-name')
      userEvent.type(nome, 'teste')

      const button = screen.getByTestId('btn-play')
      expect(button).toBeInTheDocument()
      userEvent.click(button)

      await waitFor(() => expect(global.fetch).toHaveBeenCalled())

      const correctAnswer1 = await screen.findByTestId('correct-answer');
      jest.runAllTimers();

      expect(correctAnswer1).toBeDisabled()
    userEvent.click(correctAnswer1)

    const btnNext = screen.getByRole('button', {
        name: /next/i
      })

      expect(btnNext).toBeInTheDocument()
      userEvent.click(btnNext)
      jest.runAllTimers();

      const optOne = screen.getByRole('button', {
        name: /graviton/i
      })

      const optTwo = screen.getByRole('button', {
        name: /z boson/i
      })

      const optThree = screen.getByRole('button', {
        name: /tau neutrino/i
      })

      const optFour = screen.getByRole('button', {
        name: /gluon/i
      })

      expect(optOne).toBeDisabled()
      expect(optTwo).toBeDisabled()
      expect(optThree).toBeDisabled()
      expect(optFour).toBeDisabled()

})

});
