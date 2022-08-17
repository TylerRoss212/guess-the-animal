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
        let audio = new Audio()
        audio.src = "https://storage.googleapis.com/guesstheanimal/1_2.mp3"
        audio.load();
        audio.play();
    }
}
