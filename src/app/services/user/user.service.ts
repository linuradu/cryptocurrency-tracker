import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {marketSet} from '../../store/actions/market.actions';
import {select, Store} from '@ngrx/store';
import {Market} from '../../models/market';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userOnboardedSubject: BehaviorSubject<boolean>;
  public userOnboarded: Observable<boolean>;
  public markets$: Observable<Market[]>;

  constructor(private store: Store<{ markets: Market[] }>) {
    this.userOnboardedSubject = new BehaviorSubject<boolean>(false);
    this.userOnboarded = this.userOnboardedSubject.asObservable();

    this.markets$ = store.pipe(select('markets'));
  }

  hasOnboard(): Observable<boolean> {
    return this.store.select(favorites => {
      if (favorites.markets == null || favorites.markets.length === 0) {
        return false;
      }

      return true;
    });
  }

  getFavorites(): Observable<Market[]> {
    return this.store.select(favorites => {
      return favorites.markets;
    });
  }

  setFavorites(favorites: Market[]): boolean {
    console.log('setFavorites');

    if (favorites == null || favorites.length === 0) {
      console.log('this.userOnboardedSubject.next(true)');
      this.userOnboardedSubject.next(false);

      return false;
    }

    // this.store.dispatch(new marketSet(favorites));
    this.store.dispatch(marketSet({payload: favorites}));

    // Showing the list of stored markets;
    // this.store.select(state => state.markets).subscribe(markets => console.log(markets)).unsubscribe();

    // notify subscribers - user has been onboarded
    console.log('this.userOnboardedSubject.next(true)');
    this.userOnboardedSubject.next(true);

    return true;
  }
}
