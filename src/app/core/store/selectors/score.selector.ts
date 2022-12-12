import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const scoreSelector = (state: AppState) => state.score;

export const getScore = () =>
  createSelector(scoreSelector, (score: number) => {
    return score;
  });
