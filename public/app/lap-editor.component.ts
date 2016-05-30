import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Lap } from "./lap";
import { LapService } from "./lap.service"

@Component({
    selector: "lap-editor",
    template: `
<form class="save-lap navbar-form navbar-left">
    <div class="row">
        <input type="hidden" name="_id" value=""/>
        <input type="hidden" name="createdAt" value=""/>
        <input type="hidden" name="createdBy" value=""/>
        <input class="col-xs-2" type="text" name="driver" placeholder="Driver" [(ngModel)]="lap.driver"/>
        <input class="col-xs-2" type="text" name="lapTime" placeholder="Lap Time" autocomplete="off" [(ngModel)]="lap.lapTime"/>
        <input class="col-xs-2" type="text" name="trackLocation" placeholder="Track Location" [(ngModel)]="lap.trackLocation"/>
        <input class="col-xs-2" type="text" name="trackVariation" placeholder="Track Variation" [(ngModel)]="lap.trackVariation"/>
        <input class="col-xs-2" type="text" name="carName" placeholder="Car Name" [(ngModel)]="lap.carName"/>
        <input class="col-xs-2" type="text" name="carClassName" placeholder="Car Class" [(ngModel)]="lap.carClassName"/>
    </div>
    <div class="row">
        <a href="#" class="btn btn-success" (click)="onSave()">Save</a>
        <a href="#" class="btn btn-danger" (click)="onCancel()">Cancel</a>
    </div>
</form>
`
})
export class LapEditorComponent {
    @Input()
    title:string;

    @Input()
    lap:Lap;

    @Output()
    cancelled = new EventEmitter();

    @Output()
    saved = new EventEmitter();
     
    constructor(private lapService: LapService) {
    }

    onSave() {
        this.lapService.saveLap(this.lap).subscribe((lap) => this.lap = lap);
        this.saved.emit(this.lap);
    }

    onCancel() {
        this.cancelled.emit(this.lap)
    }
}