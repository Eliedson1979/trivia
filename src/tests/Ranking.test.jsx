import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testing Ranking page', () => {
    it("Should render all page's elements", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const mockRanking = [
        {
        name: 'first pessoa',
        score: 100,
        gravatarEmail: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
       },
       {
        name: 'second person',
        score: 90,
        gravatarEmail: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
       },
       {
        name: 'third person',
        score: 70,
        gravatarEmail: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
       },
    ];

    localStorage.setItem('ranking', JSON.stringify(mockRanking));

    history.push('/ranking');

    const title = screen.getByTestId('ranking-title');
    const buttonLogin = screen.getByTestId('btn-go-home');

    expect(title).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    userEvent.click(buttonLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    });

    it('tests if the page displays all elements', () => {

      const { history } = renderWithRouterAndRedux(<App />);

      history.push('/Feedback')

      const buttonRanking = screen.getByTestId('btn-ranking')
      expect(buttonRanking).toBeInTheDocument();

      userEvent.click(buttonRanking)

      const playerName = screen.getByTestId('player-name-0');
      expect(playerName).toBeInTheDocument();

      const playerScore = screen.getByTestId('player-score-0');
      expect(playerScore).toBeInTheDocument();

    });
    it('test return to login page', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/ranking');

      const button = screen.getByTestId('btn-go-home');
      userEvent.click(button);

      expect(history.location.pathname).toBe('/');
    });

  });