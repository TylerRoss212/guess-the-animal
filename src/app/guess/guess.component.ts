import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CURRENT_GUESS_NUM_KEY, GUESSES_KEY, ANIMAL_NUMBER_KEY, DONE_KEY, STATS_KEY} from "../constants";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Animal} from "../animal/Animal";
import {GuessService} from "../service/GuessService";

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {

    baseUrl = environment.baseUrl;

    focus: boolean = false;

    currentGuessNum: number = 0;
    guesses: Array<{key: Animal, value: {key: boolean, value: boolean}}> = new Array<{key: Animal; value: {key: boolean; value: boolean}}>();
    done: boolean = false;

    animalNumber: Number = 0;

    animalList: Animal[] = [];
    searchList: Animal[] = [];

    copied: boolean = false;

    constructor(private http: HttpClient,
                private changeDetectorRef: ChangeDetectorRef,
                private guessService: GuessService) { }

    ngOnInit(): void {
        this.getNumber();
        this.getDone();
        this.getCurrentGuessNum();
        this.getGuesses();
        this.getAnimalList();
    }

    getDone() {
        this.done = (localStorage.getItem(DONE_KEY) == "true");
    }

    onInput() {
        // @ts-ignore
        let guess = String(document.getElementById("guess").value);

        this.searchList = [];
        // search the animal list
        if (guess != "") {
            for (let animal of this.animalList) {
                if ((animal.name.toLowerCase().includes(guess.toLowerCase())) &&
                    (animal.name.toLowerCase() != guess.toLowerCase())) {
                    if (this.searchList.length < 6) {
                        this.searchList.push(animal);
                    }
                }
            }
        }
    }

    getAnimalList() {
        this.http.get<Animal[]>(this.baseUrl + "/api/animals/findAllWithoutId").subscribe((list: Animal[]) => {
            this.animalList = list;
        })
    }

    getNumber() {
        this.animalNumber = Number(localStorage.getItem(ANIMAL_NUMBER_KEY));
    }

    getCurrentGuessNum() {
        // get the guess number from memory
        this.currentGuessNum = Number(localStorage.getItem(CURRENT_GUESS_NUM_KEY));
    }

    getGuesses() {
        // get the guesses for the day
        // @ts-ignore
        this.guesses = JSON.parse(localStorage.getItem(GUESSES_KEY));

    }

    submitGuess() {
        // @ts-ignore
        let guess = String(document.getElementById("guess").value);
        // @ts-ignore
        document.getElementById("guess").value = "";

        if (guess == "") {
            console.log(guess);
            guess = "null";
        }
        guess = guess.toLowerCase();

        this.http.post<Animal>(this.baseUrl + "/api/animals/findByName", guess).subscribe((animal) => {


            // map the guess
            this.http.get<Animal>(this.baseUrl + "/api/animals/findById/" + this.animalNumber).subscribe((correctAnimal) => {
                if (animal === null) {
                    animal = new Animal(-1, "Skipped", "");
                }
                this.mapTheGuess(animal, correctAnimal);
                if (this.currentGuessNum != 5) {
                    this.currentGuessNum++;
                }
                localStorage.setItem(CURRENT_GUESS_NUM_KEY, String(this.currentGuessNum));
                this.guessService.getSubject().next(true);
            });
        });
    }

    mapTheGuess(guessAnimal: Animal, correctAnimal: Animal) {
        let isCorrectClass = false;
        if (guessAnimal.classification == correctAnimal.classification) {
            isCorrectClass = true;
        }
        let isCorrectGuess = false;
        if (guessAnimal.id == correctAnimal.id) {
            isCorrectGuess = true;
            this.done = true;
            localStorage.setItem(DONE_KEY, String(this.done));

            // do stats
            // @ts-ignore
            let stats = JSON.parse(localStorage.getItem(STATS_KEY));
            console.log("stats: " + stats[0]);
            stats[this.currentGuessNum]++;
            localStorage.setItem(STATS_KEY, JSON.stringify(stats));

        }
        this.guesses.push({key: guessAnimal, value: {key: isCorrectGuess, value: isCorrectClass}});
        localStorage.setItem(GUESSES_KEY, JSON.stringify(this.guesses));

        if (this.currentGuessNum == 5) {
            this.done = true;
            localStorage.setItem(DONE_KEY, String(this.done));
        }
    }

    getShareString() {
        let btn = document.getElementById("shareBtn");
        // @ts-ignore
        btn.classList.toggle("clicked");
        setTimeout(() => {
            // @ts-ignore
            btn.classList.toggle("clicked");
        }, 400);

        let res = "Guess The Animal #" + this.animalNumber + "\n\n"

        res += "\u{1F9A6}"
        for (let guess of this.guesses) {
            if (guess.value.value && !guess.value.key) {
                res += "\u{1F7E8}";
            } else if (guess.value.key) {
                res += "\u{1F7E9}";
            } else {
                res += "\u{1F7E5}";
            }
        }

        if (this.guesses.length < 6) {
            for (let i = 0; i < (6 - this.guesses.length); ++i) {
                res += "\u{2B1B}";
            }
        }

        res += "\n\n";
        res += "https://guesstheanimal.com";

        navigator.clipboard.writeText(res);
    }

    searchClick(name: String) {
        // @ts-ignore
        document.getElementById("guess").value = name;
        this.onInput();
    }

    skip() {
        let animal = new Animal(-1, "Skipped", "");
        this.http.get<Animal>(this.baseUrl + "/api/animals/findById/" + this.animalNumber).subscribe((correctAnimal) => {
            this.mapTheGuess(animal, correctAnimal);
            if (this.currentGuessNum != 5) {
                this.currentGuessNum++;
            }
            localStorage.setItem(CURRENT_GUESS_NUM_KEY, String(this.currentGuessNum));
            this.guessService.getSubject().next(true);
        });
    }
}
