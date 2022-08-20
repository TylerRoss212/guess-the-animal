import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    baseUrl = environment.baseUrl;

    displayStats: boolean = false;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
      this.http.get(this.baseUrl + "/api/animals/findAll").subscribe((data) => {
          console.log(data);
      })
      this.http.get(this.baseUrl + "/api/animals/getNumber").subscribe((data) => {
          console.log(data);
      })
    }

    showStats() {
      this.displayStats = true;
    }

}
