import { createAction, props} from '@ngrx/store';
import {Market} from '../../models/market';

export const marketAdd = createAction(
  '[Market Component] Add',
  props<{payload: Market}>()
);

export const marketSet = createAction(
  '[Market Component] Set',
  props<{payload: Market []}>()
);

export const marketRemove = createAction(
  '[Market Component] Remove',
  props<{payload: Market}>()
);

export const marketReset = createAction(
  '[Market Component] Reset'
);


