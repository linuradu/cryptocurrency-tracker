import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MarketSummary} from '../../models/marketSummary';
import {MarketSet} from '../../store/actions/market.actions';
import {select, Store} from '@ngrx/store';
import {Market} from '../../models/market';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userOnboardedSubject: BehaviorSubject<boolean>;
  public userOnboarded: Observable<boolean>;

  constructor(private store: Store<{ assets: MarketSummary[] }>) {
    this.userOnboardedSubject = new BehaviorSubject<boolean>(false);
    this.userOnboarded = this.userOnboardedSubject.asObservable();

    store.pipe(select('assets'));
  }

  hasOnboard(): Observable<boolean> {
    return this.store.select(favorites => {
      if (favorites.assets == null || favorites.assets.length === 0) {
        return false;
      }

      return true;
    });
  }

  getFavorites(): Observable<MarketSummary[]> {
    return this.store.select(favorites => {
      return favorites.assets;
    });
  }

  setFavorites(favorites: Market[]): boolean {
    console.log('setFavorites');

    if (favorites == null || favorites.length === 0) {
      console.log('this.userOnboardedSubject.next(true)');
      this.userOnboardedSubject.next(false);

      return false;
    }

    this.store.dispatch(new MarketSet(favorites));

    // Showing the list of stored assets;
    // this.store.select(state => state.assets).subscribe(assets => console.log(assets)).unsubscribe();

    // notify subscribers - user has been onboarded
    console.log('this.userOnboardedSubject.next(true)');
    this.userOnboardedSubject.next(true);

    return true;
  }
}
