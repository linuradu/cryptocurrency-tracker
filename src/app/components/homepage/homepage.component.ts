import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MarketSummary} from '../../models/marketSummary';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {CryptoCurrencyService} from '../../services/cryptocurrency/cryptocurrency.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  displayedColumns: string[] = [/*'select',*/ 'marketName', 'high', 'low', 'last', 'volume',
    'bid', 'ask', 'openBuyOrders', 'openSellOrders', 'timestamp'];
  dataSource = new MatTableDataSource<MarketSummary>();
  selection = new SelectionModel<MarketSummary>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private userService: UserService, private cryptoCurrencyService: CryptoCurrencyService) {
  }

  ngOnInit() {
    this.getMarketCryptoCurrencies();
    this.dataSource.paginator = this.paginator;
  }

  getMarketCryptoCurrencies(): void {
    this.cryptoCurrencyService.getMarketSummaries()
      .subscribe(marketSummary => {

        // set the selection if the user has already been onboarded
        this.userService.getFavorites().subscribe(favorites => {
          const favNames: string[] = favorites.map(fav => fav.marketName);

          // Processing the grid
          this.processForGrid(marketSummary.result.filter(item => favNames.indexOf(item.MarketName) > -1));
        });
      });
  }

  processForGrid(data): void {
    let position = 1;
    const dataSource = [];

    data.forEach(item => {
      const marketSummary: MarketSummary = {
        position: position++,
        marketName: item.MarketName,
        high: item.High,
        low: item.Low,
        last: item.Last,
        volume: item.Volume,
        bid: item.Bid,
        ask: item.Ask,
        openBuyOrders: item.OpenBuyOrders,
        openSellOrders: item.OpenSellOrders,
        timestamp: item.TimeStamp,
        created: item.Created
      };

      dataSource.push(marketSummary);
    });

    this.dataSource.data = dataSource;
    console.log('this.dataSource.data');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
