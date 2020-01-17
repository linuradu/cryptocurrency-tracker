import {ActionEx, MarketActionTypes} from '../actions/market.actions';

export const initialState = [];

export function MarketReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case MarketActionTypes.Add:
      return [...state, action.payload];
    case MarketActionTypes.Set:
      state = action.payload;
      return state;
    case MarketActionTypes.Reset:
      state = [];
      return state;
    case MarketActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}

