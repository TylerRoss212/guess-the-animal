import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ANIMAL_NUMBER_KEY, CURRENT_GUESS_NUM_KEY, DONE_KEY} from "../constants";
import {GuessService} from "../service/GuessService";

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
    audio: HTMLAudioElement = new Audio();

    buttonBaseUrl: String = "assets/icons/";

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private guessService: GuessService) { }

    ngOnInit(): void {
        this.getPictureNumber();
        this.getDone();
        this.getAnimalNumber();
        this.setUpAudio();
        this.audio.addEventListener("ended", () => { });
        this.guessService.getSubject().subscribe((data) => {
            if (data) {
                this.getPictureNumber();
                this.getDone();
                this.changeDetectorRef.detectChanges();
            }
        })
    }

    getDone() {
        if (localStorage.getItem(DONE_KEY) == "true") {
            this.guessNumber = 5;
        }
    }

    setUpAudio() {
        this.audio.src = "https://storage.googleapis.com/guesstheanimal/" + this.animalNumber + "/1.mp3";
        this.getButtonUrl()
    }

    getButtonUrl() {
        if (!this.audio.paused) {
            return this.buttonBaseUrl + "stop.png";
        } else {
            return this.buttonBaseUrl + "play.png";
        }
    }

    getPictureNumber() {
        this.pictureNumber = Number(localStorage.getItem(CURRENT_GUESS_NUM_KEY));
        this.guessNumber = this.pictureNumber;
        if (this.pictureNumber == 1) {
            this.isAudio = true;
        } else {
            this.isAudio = false;
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

    audioButton() {
        if (this.audio.paused) {
            this.audio.load();
            this.audio.play().then(() => {
                this.changeDetectorRef.detectChanges();
            });
        } else {
            this.audio.pause();
            this.changeDetectorRef.detectChanges();
        }
    }

    isSelected(id: number): boolean {
        if (id == this.pictureNumber) {
            return true;
        }

        return false;
    }

}
