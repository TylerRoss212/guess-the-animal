import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayStats: boolean = false;
  prod = environment.production;

  constructor() {
  }

  ngOnInit(): void {
  }

  showStats() {
      this.displayStats = true;
  }

}
