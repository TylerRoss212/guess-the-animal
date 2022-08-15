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

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.http.get(this.baseUrl + "/api/hello").subscribe((data) => {
            console.log(data);
        })
    }
}
