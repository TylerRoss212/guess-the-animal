import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class GuessService {
    private guessSubject = new Subject<any>();

    public getSubject(): Subject<any> {
        return this.guessSubject;
    }
}