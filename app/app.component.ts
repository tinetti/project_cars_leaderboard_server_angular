import {Component} from "@angular/core";
import {Lap} from "./lap";
import {LapListComponent} from "./lap-list.component";


@Component({
    selector: 'my-app',
    template: `
<div class="container">
    <div class="page-header">
        <h1><img src="/images/project_cars_logo.png"> Leaderboard</h1>
    </div>
  
    <lap-list [(laps)]="laps"></lap-list>
</div>
`,
    directives: [LapListComponent]
})

export class AppComponent {
    laps = LAPS;
    selectedLap:Lap;
}

var LAPS:Lap[] = [
    {"id": "11", "driver": "Johnny", "lapTime": "1:23.456", "carName": "BMW M6", "carClassName": "Road", "trackLocation": "BIR", "trackVariation": "Short"},
    {"id": "12", "driver": "Johnny", "lapTime": "2:23.456", "carName": "BMW M6", "carClassName": "Road", "trackLocation": "BIR", "trackVariation": "Long"},
    {"id": "13", "driver": "Johnny", "lapTime": "3:23.456", "carName": "BMW M6", "carClassName": "Road", "trackLocation": "BIR", "trackVariation": "Short"},
    {"id": "21", "driver": "Pauly", "lapTime": "1:23.456", "carName": "BMW M6", "carClassName": "Road", "trackLocation": "BIR", "trackVariation": "Short"},
    {"id": "22", "driver": "Pauly", "lapTime": "2:23.456", "carName": "BMW M6", "carClassName": "Road", "trackLocation": "BIR", "trackVariation": "Short"},
    {"id": "23", "driver": "Pauly", "lapTime": "3:23.456", "carName": "BMW M6", "carClassName": "Road", "trackLocation": "BIR", "trackVariation": "Long"}
];