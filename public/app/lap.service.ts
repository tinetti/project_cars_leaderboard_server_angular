import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Lap }            from './lap'

import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class LapService {
    constructor(private http: Http) { }

    private lapsUrl = 'api/laps';

    getLaps(): Observable<Lap[]> {
        return this.http.get(this.lapsUrl)
            .map((res) => res.json().laps || {})
            .catch(this.handleError);
    }

    saveLap(lap: Lap): Observable<Lap> {
        let lapUrl = `${this.lapsUrl}/${lap._id}`
        let body = JSON.stringify(lap);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log(`saving lap (${lapUrl}): ${lap}`);

        if (lap._id) {
            return this.http.put(lapUrl, body, options)
                .map((res) => res.json() || {})
                .catch(this.handleError);
        } else {
            return this.http.post(this.lapsUrl, body, options)
                .map((res) => res.json() || {})
                .catch(this.handleError);
        }
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
