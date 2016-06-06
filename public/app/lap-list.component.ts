import {Component, EventEmitter, Input} from "@angular/core";
import {Lap} from "./lap";
import {LapEditorComponent} from "./lap-editor.component";

@Component({
    selector: "lap-list",
    template: `
<div class="panel panel-success">
    <div class="panel-heading">
        <span class="panel-title">{{title}}</span>
        <span class="create-lap glyphicon glyphicon-plus" (click)="onCreateLap()"></span>  
    </div>
    
    <div class="lap-list-container">
        <div class="row lap-list-row lap-list-header-row">
            <div class="col-xs-3 lap-list-header-cell">Driver</div>
            <div class="col-xs-3 lap-list-header-cell">Lap Time</div>
            <div class="col-xs-3 lap-list-header-cell">Track</div>
            <div class="col-xs-3 lap-list-header-cell">Car</div>
        </div>
        
        <div *ngFor="let lap of laps">
            <div *ngIf="lap == selectedLap" class="row lap-list-row lap-list-detail-row">
                <lap-editor 
                    [lap]="selectedLap" 
                    [title]="'Edit Lap'" 
                    (saved)="onSave(lap)" 
                    (cancelled)="onCancel()" 
                    (deleted)="onDelete(lap)"></lap-editor>
            </div>
            <div *ngIf="lap != selectedLap" class="row lap-list-row lap-list-detail-row">
                <div class="col-xs-3 lap-list-detail-cell" (click)="onLapSelected(lap)">{{lap.driver}}</div>
                <div class="col-xs-3 lap-list-detail-cell" (click)="onLapSelected(lap)">{{lap.lapTime}}</div>
                <div class="col-xs-3 lap-list-detail-cell" (click)="onLapSelected(lap)">{{lap.trackLocation}}</div>
                <div class="col-xs-3 lap-list-detail-cell" (click)="onLapSelected(lap)">{{lap.carName}}</div>
            </div>
        </div>
    </div>
</div>
`,
    directives: [
        LapEditorComponent
    ]
})
export class LapListComponent {
    @Input()
    title:string;

    @Input()
    laps:Lap[];

    selectedLap:Lap;

    onCreateLap() {
        var lap = {};
        if (this.laps.length) {
            lap = this.laps[0];
        }
        var lapCopy = JSON.parse(JSON.stringify(lap));
        lapCopy._id = null;
        lapCopy.lapTime = null;
        lapCopy.lapTimestamp = null;
        lapCopy.createdTimestamp = null;
        lapCopy.modifiedTimestamp = null;
        this.selectedLap = lapCopy;
        this.laps.splice(0, 0, lapCopy);
    }

    onLapSelected(lap:Lap) {
        this.selectedLap = lap;
    }

    onSave(lap:Lap) {
        this.selectedLap = null;
    }

    onCancel() {
        if (!this.selectedLap._id) {
            this.laps.splice(0, 1);
        }
        this.selectedLap = null;
    }

    onDelete(lap:Lap) {
        for (var i = 0; i < this.laps.length; i++) {
            if (lap._id == this.laps[i]._id) {
                this.laps.splice(i, 1);
            }
        }
        this.selectedLap = null;
    }
}
