import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { HintComponent } from './hint/hint.component';
import { GuessComponent } from './guess/guess.component';
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ANIMAL_NUMBER_KEY, CURRENT_GUESS_NUM_KEY, DONE_KEY, GUESSES_KEY, STATS_KEY} from "./constants";
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HintComponent,
    GuessComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        DialogModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: []
})
export class AppModule implements DoBootstrap {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    ngDoBootstrap(app: ApplicationRef) {
        // get the number from the backend
        this.http.get(this.baseUrl + "/api/animals/getNumber").subscribe((number) => {
            let newNumber = Number(number);

            // check if the stored number matches
            if ((newNumber !== Number(localStorage.getItem(ANIMAL_NUMBER_KEY))) || (localStorage.getItem(ANIMAL_NUMBER_KEY) === null )) {
                // if the numbers do not match reset values
                localStorage.setItem(CURRENT_GUESS_NUM_KEY, "0");
                localStorage.setItem(GUESSES_KEY, "[]");
                localStorage.setItem(ANIMAL_NUMBER_KEY, String(newNumber));
                localStorage.setItem(DONE_KEY, String(false));
            }

            // check the localStorage
            let temp = localStorage.getItem(CURRENT_GUESS_NUM_KEY);
            if (temp == null) {
                localStorage.setItem(CURRENT_GUESS_NUM_KEY, "0");
            }
            temp = localStorage.getItem(GUESSES_KEY);
            if (temp == null) {
                localStorage.setItem(GUESSES_KEY, "[]");
            }
            temp = localStorage.getItem(DONE_KEY);
            if (temp == null) {
                localStorage.setItem(DONE_KEY, "false");
            }

            // check for stats
            if (localStorage.getItem(STATS_KEY) == null) {
                localStorage.setItem(STATS_KEY, JSON.stringify(new Array<Number>(0, 0, 0, 0, 0 ,0)));
            }

            app.bootstrap(AppComponent);
        })
    }
}

