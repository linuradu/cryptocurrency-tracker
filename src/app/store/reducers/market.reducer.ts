import {Action, createReducer, on} from "@ngrx/store";

import * as MarketActions from '../actions/market.actions';
import {Market} from '../../models/market';

export const initialState: Market[] = [];

const reducer = createReducer(
  initialState,
  on(MarketActions.marketAdd, (state, {payload}) => [...state, payload]),
  on(MarketActions.marketSet, (state, {payload}) => payload),
  on(MarketActions.marketRemove, (state, {payload}) => [
    ...state.slice(0, state.indexOf(payload)),
    ...state.slice(state.indexOf(payload) + 1)
  ]),
  on(MarketActions.marketReset, state => [])
);

export function marketReducer(state: [] | undefined, action: Action) {
  return reducer(state, action);
}
