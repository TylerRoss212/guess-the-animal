import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ANIMAL_NUMBER_KEY, CURRENT_GUESS_NUM_KEY} from "../constants";

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit {

    pictureNumber: Number = 0;
    animalNumber: Number = 0;
    guessNumber: Number = 0;

    isAudio: boolean = false;

    buttonUrl: String = "assets/icons/play.png";

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.getPictureNumber();
        this.getAnimalNumber();
    }

    getPictureNumber() {
        //this.pictureNumber = Number(localStorage.getItem(CURRENT_GUESS_NUM_KEY));
        this.pictureNumber = 5;
        this.guessNumber = this.pictureNumber;
        if (this.pictureNumber == 1) {
            this.isAudio = true;
        }
    }

    getAnimalNumber() {
        this.animalNumber = Number(localStorage.getItem(ANIMAL_NUMBER_KEY));
    }

    getUrl(): String {
        let extension = ".png"
        if (this.pictureNumber == 1) {
            extension = ".mp3";
        }
        return "https://storage.googleapis.com/guesstheanimal/" + this.animalNumber + "/" + this.pictureNumber + extension;
    }

    isButtonDisabled(id: number): boolean {
        if (id > this.guessNumber) {
            return true;
        }

        return false;
    }

    changeHint(hintNumber: Number) {
        if (hintNumber == 1) {
            this.isAudio = true;
        } else {
            this.isAudio = false;
        }

        this.pictureNumber = hintNumber;
        this.changeDetectorRef.detectChanges();
    }

}
