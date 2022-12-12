import { createAction, props } from '@ngrx/store';

export const changeScore = createAction(
  '[add score] add',
  props<{ score: number }>()
);
