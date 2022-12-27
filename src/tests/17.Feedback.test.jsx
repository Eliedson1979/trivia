import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const fakeState = {
    player: {
      name: 'João',
      assertions: 2,
      score: 79,
      gravatarEmail: 'https://www.gravatar.com/avatar/cd0f20c860ddc400e977305248b96b857be92aed54f8cb04d2479c49373f3b92'
    }
  };

  const otherFakeState = {
    player: {
      name: 'Maria',
      assertions: 5,
      score: 120,
      gravatarEmail: 'https://www.gravatar.com/avatar/cd0f20c860ddc400e977305248b96b857be92aed54f8cb04d2479c49373f3b92'
    }
  };

describe('Testing the Feedback Page', () => {
    it(`checks if there is an element that shows the player's name`, () => {
        renderWithRouterAndRedux(<Feedback />);
        const playerName = screen.getByTestId('header-player-name');
        expect(playerName).toBeInTheDocument();
    })
    it(`checks if there is an element that shows the player's score`, () => {
        renderWithRouterAndRedux(<Feedback />);
        const scoreGame = screen.getByTestId('header-score');
        expect(scoreGame).toBeInTheDocument();
    })
   it(`checks if there is an element that shows the player's total score`, () => {
        renderWithRouterAndRedux(<Feedback />);
        const totalScoreGame = screen.getByTestId('feedback-total-score');
        expect(totalScoreGame).toBeInTheDocument();
    })
    it(`checks if there is a text element referring to the player's score`, () => {
        renderWithRouterAndRedux(<Feedback />);
        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toBeDefined();
    })
    it(`checks if there is an element that shows the total number of questions`, () => {
        renderWithRouterAndRedux(<Feedback />);
        const totalQuestions = screen.getByTestId('feedback-total-question');
        expect(totalQuestions).toBeInTheDocument();
    })
   it(`checks for two buttons`, () => {
        renderWithRouterAndRedux(<Feedback />);
        const playAgainButton = screen.getByTestId('btn-play-again');
        const rankingButton = screen.getByTestId('btn-ranking');
        expect(playAgainButton).toBeInTheDocument();
        expect(rankingButton).toBeInTheDocument();
    })
    it(`checks if when clicking play again, the page is redirected to '/'`, () => {
        const {history} = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        const playAgainButton = screen.getByTestId('btn-play-again');
        userEvent.click(playAgainButton);
        const input = screen.getByTestId('input-player-name');
        expect(input).toBeInTheDocument();
    })
    it(`checks if clicking on the ranking button, the page is redirected to '/ranking`, () => {
        const {history} = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        const rankingButton = screen.getByTestId('btn-ranking');
        userEvent.click(rankingButton);
        const rankingTitle = screen.getByTestId('ranking-title');
        expect(rankingTitle).toBeInTheDocument();
    })
    it(`checks if the correct message appears according to the low score`, () => {
        renderWithRouterAndRedux(<App />, fakeState, '/feedback');
        const totalQuestions = screen.getByTestId('feedback-total-question');
        expect(totalQuestions).toHaveTextContent(fakeState.player.assertions);

        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toHaveTextContent('Could be better...');
        expect(feedbackText).not.toHaveTextContent('Well Done!');
    })
    it(`checks if the correct message appears according to the high score`, () => {
        renderWithRouterAndRedux(<App />, otherFakeState, '/feedback');
        const totalQuestions = screen.getByTestId('feedback-total-question');
        expect(totalQuestions).toHaveTextContent(otherFakeState.player.assertions);

        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toHaveTextContent('Well Done!');
        expect(feedbackText).not.toHaveTextContent('Could be better...');
    })

})