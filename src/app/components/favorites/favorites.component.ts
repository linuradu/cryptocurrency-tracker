import {Component, OnInit, ViewChild} from '@angular/core';

import {CryptoCurrencyService} from '../../services/cryptocurrency/cryptocurrency.service';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {Market} from "../../models/market";

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  displayedColumns: string[] = ['select', 'marketName', 'marketCurrency', 'baseCurrency', 'marketCurrencyLong',
    'baseCurrencyLong', 'minTradeSize', 'isActive', 'isRestricted', 'created'];
  dataSource = new MatTableDataSource<Market>();
  selection = new SelectionModel<Market>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private userService: UserService, private cryptoCurrencyService: CryptoCurrencyService) {
  }

  ngOnInit() {
    this.getMarketCryptoCurrencies();
    this.dataSource.paginator = this.paginator;
  }

  getMarketCryptoCurrencies(): void {
    this.cryptoCurrencyService.getMarkets()
      .subscribe(markets => {
        // Processing the grid
        this.processForGrid(markets.result);

        // set the selection if the user has already been onboarded
        this.userService.getFavorites().subscribe(favorites => {
          const favNames: string[] = favorites.map(fav => fav.marketName);
          this.dataSource.data.filter(item => favNames.indexOf(item.marketName) > -1)
            .forEach(dataSourceFav => {
              this.selection.select(dataSourceFav);
            });
        });
      });
  }

  processForGrid(data): void {
    let position = 1;
    const dataSource = [];

    data.forEach(item => {
      const market: Market = {
        position: position++,
        marketName: item.MarketName,
        marketCurrency: item.MarketCurrency,
        baseCurrency: item.BaseCurrency,
        marketCurrencyLong: item.MarketCurrencyLong,
        baseCurrencyLong: item.BaseCurrencyLong,
        minTradeSize: item.MinTradeSize,
        isActive: item.IsActive,
        isRestricted: item.IsRestricted,
        created: item.Created
      };

      dataSource.push(market);
    });

    this.dataSource.data = dataSource;
    console.log('this.dataSource.data');
  }

  setFavorites(): void {
    if (this.userService.setFavorites(this.selection.selected)) {
      console.log('Favorites set.');
      this.router.navigate(['/homepage']);
    } else {
      console.log('Favorites not set.');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Market): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
