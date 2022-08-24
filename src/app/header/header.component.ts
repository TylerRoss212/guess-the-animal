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
    }

}
