import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { HintComponent } from './hint/hint.component';
import { GuessComponent } from './guess/guess.component';
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ANIMAL_NUMBER_KEY, CURRENT_GUESS_NUM_KEY, GUESSES_KEY} from "./constants";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    HeaderComponent,
    HintComponent,
    GuessComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        DialogModule,
        BrowserAnimationsModule
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
            if (newNumber != Number(localStorage.getItem(ANIMAL_NUMBER_KEY))) {
                // if the numbers do not match reset values
                localStorage.setItem(CURRENT_GUESS_NUM_KEY, "0");
                localStorage.setItem(GUESSES_KEY, "[]");
                localStorage.setItem(ANIMAL_NUMBER_KEY, String(newNumber));
            }

            app.bootstrap(AppComponent);
        })
    }
}

