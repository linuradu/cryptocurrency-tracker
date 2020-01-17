import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userOnboarded: boolean;

  constructor(private userService: UserService) {
    this.userService.userOnboarded.subscribe(userOnboarded => {
      this.userOnboarded = userOnboarded;
    });
  }

  ngOnInit() {
  }
}
