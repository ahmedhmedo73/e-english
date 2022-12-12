import { changeScore } from './../actions/score.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: number = 0;
const _scoreReducer = createReducer(
  initialState,
  on(changeScore, (state, { score }) => {
    localStorage.setItem('score', score.toString());
    return state + score;
  })
);
export function scoreReducer(state: any, action: any) {
  return _scoreReducer(state, action);
}
