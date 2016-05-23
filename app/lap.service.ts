import {Injectable} from '@angular/core';
import {LAPS} from "./mock-laps";

@Injectable()
export class LapService {
    getLaps() {
        return Promise.resolve(LAPS);
    }
}
