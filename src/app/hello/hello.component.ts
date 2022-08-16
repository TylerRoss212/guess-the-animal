import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

    baseUrl = environment.baseUrl;
    displayClicks: number = 0;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.displayClicks = Number(localStorage.getItem("clicks"));
    }

    onClick() {
        let clicks = Number(localStorage.getItem("clicks"));
        if (clicks == null) {
            clicks = 1;
        } else {
            clicks++;
        }
        this.displayClicks = clicks;
        localStorage.setItem("clicks", String(clicks));
    }
}
