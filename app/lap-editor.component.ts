import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Lap} from "./lap";

@Component({
    selector: "lap-editor",
    template: `
<div class="panel panel-primary">
    <div class="panel-heading">
        <h3 class="panel-title">{{title}}</h3>
    </div>
    <div class="panel-body save-lap-panel-body">
        <form class="save-lap navbar-form navbar-left">
            <input type="hidden" name="_id" value=""/>
            <input type="hidden" name="createdAt" value=""/>
            <input type="hidden" name="createdBy" value=""/>
            <div class="row">
                <input class="col-xs-2" type="text" name="driver" placeholder="Driver" [(ngModel)]="lap.driver"/>
                <input class="col-xs-3" type="text" name="lapTime" placeholder="Lap Time" autocomplete="off" [(ngModel)]="lap.lapTime"/>
                <input class="col-xs-4" type="text" name="carName" placeholder="Car Name" [(ngModel)]="lap.carName"/>
                <input class="col-xs-3" type="text" name="carClassName" placeholder="Car Class" [(ngModel)]="lap.carClassName"/>
            </div>
            <div class="row">
                <input class="col-xs-7" type="text" name="trackLocation" placeholder="Track Location" [(ngModel)]="lap.trackLocation"/>
                <input class="col-xs-5" type="text" name="trackVariation" placeholder="Track Variation" [(ngModel)]="lap.trackVariation"/>
            </div>
            <div class="row">
                <input type="submit" class="btn-success save" value="Save" (click)="onSave.emit('event')"/>
                <input type="button" class="btn-danger cancel" value="Cancel" (click)="onCancel.emit('event')"/>
            </div>
        </form>
    </div>
</div>
            `
})
export class LapEditorComponent {
    @Input()
    title:string;

    @Input()
    lap:Lap;

    @Output()
    onCancel = new EventEmitter();

    @Output()
    onSave = new EventEmitter();
}