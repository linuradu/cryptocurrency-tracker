import { createAction, props} from '@ngrx/store';
import {Market} from '../../models/market';

export enum MarketActionTypes {
  Add = '[Market Component] Add',
  Remove = '[Market Component] Remove',
  Set = '[Market Component] Set',
  Reset = '[Market Component] Reset'
}

export const marketAdd = createAction(
  MarketActionTypes.Add,
  props<{payload: Market}>()
);

export const marketSet = createAction(
  MarketActionTypes.Set,
  props<{payload: Market []}>()
);

export const marketRemove = createAction(
  MarketActionTypes.Remove,
  props<{payload: Market}>()
);

export const marketReset = createAction(
  MarketActionTypes.Reset
);


