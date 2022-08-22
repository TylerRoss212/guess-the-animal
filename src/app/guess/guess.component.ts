import { Component, OnInit } from '@angular/core';
import {CURRENT_GUESS_NUM_KEY, GUESSES_KEY, ANIMAL_NUMBER_KEY} from "../constants";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Animal} from "../animal/Animal";

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {

    baseUrl = environment.baseUrl;

    focus: boolean = false;

    currentGuessNum: Number = 0;
    guesses: String[] = [];

    animalNumber: Number = 0;

    animalList: Animal[] = [];
    searchList: Animal[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getNumber();
        this.getCurrentGuessNum();
        this.getGuesses();
        this.getAnimalList();
    }

    onInput() {
        // @ts-ignore
        let guess = String(document.getElementById("guess").value);

        this.searchList = [];
        // search the animal list
        if (guess != "") {
            for (let animal of this.animalList) {
                if (animal.name.toLowerCase().includes(guess.toLowerCase())) {
                    this.searchList.push(animal);
                }
            }
        }

        console.log(this.searchList);
    }

    getAnimalList() {
        this.http.get<Animal[]>(this.baseUrl + "/api/animals/findAllWithoutId").subscribe((list: Animal[]) => {
            this.animalList = list;
        })
    }

    getNumber() {
        this.animalNumber = Number(localStorage.getItem(ANIMAL_NUMBER_KEY));
    }

    /*
    checkNumber() {
        // get the number from the backend
        this.http.get(this.baseUrl + "/api/animals/getNumber").subscribe((number) => {
            this.number = Number(number);

            // check if the stored number matches
            if (this.number != Number(localStorage.getItem(NUMBER_KEY))) {
                // if the numbers do not match reset values
                localStorage.setItem(CURRENT_GUESS_NUM_KEY, "0");
                localStorage.setItem(GUESSES_KEY, "[]");
                localStorage.setItem(NUMBER_KEY, String(this.number));
            }
        })
    }
    */

    getCurrentGuessNum() {
        // get the guess number from memory
        this.currentGuessNum = Number(localStorage.getItem(CURRENT_GUESS_NUM_KEY))
    }

    getGuesses() {
        // get the guesses for the day
        let guessList = localStorage.getItem(GUESSES_KEY);
        if (guessList != null) {
            JSON.parse(guessList).forEach((guess: String) => {
                this.guesses.push(guess);
            })
        }
    }

}
