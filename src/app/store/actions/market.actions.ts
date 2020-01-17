import {Action} from '@ngrx/store';
import {Market} from '../../models/market';

export enum MarketActionTypes {
  Add = '[Market Component] Add',
  Remove = '[Market Component] Remove',
  Set = '[Market Component] Set',
  Reset = '[Market Component] Reset'
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}

export class MarketAdd implements ActionEx {
  readonly type = MarketActionTypes.Add;

  constructor(public payload: any) {
  }
}

export class MarketRemove implements ActionEx {
  readonly type = MarketActionTypes.Remove;

  constructor(public payload: any) {
  }
}

export class MarketSet implements ActionEx {
  readonly type = MarketActionTypes.Set;

  constructor(public payload: Market[]) {
  }
}

export class MarketReset implements ActionEx {
  readonly type = MarketActionTypes.Reset;

  constructor(public payload: any) {
  }
}
