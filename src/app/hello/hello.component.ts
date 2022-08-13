import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

    name: String = "";

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get("http://localhost:8080/hello").subscribe((data) => {
            console.log(data);
        })
    }

}
