import {Component, Input} from "@angular/core";
import {Lap} from "./lap";

@Component({
    selector: "lap-list",
    template: `
<div class="panel panel-success">
<div class="panel-heading">
    <h3 class="panel-title">Saved Laps</h3>

    <span class="create-lap glyphicon glyphicon-plus"></span>
</div>
<table class="table table-striped table-hover">
    <thead>
        <tr>
            <th>Driver</th>
            <th>Lap Time</th>
            <th>Track</th>
            <th>Car</th>
            <th class="actions">Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let lap of laps">
            <td>{{lap.driver}}</td>
            <td>{{lap.lapTime}}</td>
            <td>{{lap.trackLocation}} - {{lap.trackVariation}}</td>
            <td>{{lap.carName}} ({{lap.carClassName}})</td>
      </tr>
    </tbody>
</table>
</div>
`
})

export class LapListComponent {
    @Input()
    laps:Lap[];
}
