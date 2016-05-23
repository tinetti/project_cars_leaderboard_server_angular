import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Lap} from "./lap";
import {LapEditorComponent} from "./lap-editor.component";

@Component({
    selector: "lap-list",
    template: `

<div class="panel panel-success">
    <div class="panel-heading">
        <span class="panel-title">{{title}}</span>  
    </div>
    
    <div class="lap-list-container">
        <div class="row">
            <div class="col-xs-2 lap-list-header">Driver</div>
            <div class="col-xs-3 lap-list-header">Lap Time</div>
            <div class="col-xs-4 lap-list-header">Track</div>
            <div class="col-xs-3 lap-list-header">Car</div>
        </div>
        
        <div *ngFor="let lap of laps">
            <lap-editor *ngIf="lap == selectedLap" [lap]="selectedLap" [title]="'Edit Lap'" (saved)="onSave()" (cancelled)="onCancel()"></lap-editor>
            <div *ngIf="lap != selectedLap" class="row lap-list-row">
                <div class="col-xs-2 lap-list-cell" (click)="onLapSelected(lap)">{{lap.driver}}</div>
                <div class="col-xs-3 lap-list-cell" (click)="onLapSelected(lap)">{{lap.lapTime}}</div>
                <div class="col-xs-4 lap-list-cell" (click)="onLapSelected(lap)">{{lap.trackLocation}} - {{lap.trackVariation}}</div>
                <div class="col-xs-3 lap-list-cell" (click)="onLapSelected(lap)">{{lap.carName}} ({{lap.carClassName}})</div>
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

    onLapSelected(lap:Lap) {
        this.selectedLap = lap;
    }

    onSave() {
        console.log("onSave");
        this.selectedLap = null;
    }

    onCancel() {
        console.log("onCancel");
        this.selectedLap = null;
    }
}
