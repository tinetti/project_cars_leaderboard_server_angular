import {Component, EventEmitter, Input, Output} from "@angular/core";
import {BS_VIEW_PROVIDERS, MODAL_DIRECTVES} from 'ng2-bootstrap';
import {Lap} from "./lap";
import {LapService} from "./lap.service"

@Component({
    selector: "lap-editor",
    template: `
<form class="save-lap navbar-form navbar-left">
    <input type="hidden" name="_id" [(ngModel)]="lap._id"/>
    <input type="hidden" name="createdTimestamp" [(ngModel)]="lap.createdTimestamp"/>
    <input type="hidden" name="modifiedTimestamp" [(ngModel)]="lap.modifiedTimestamp"/>
    <div class="row">
        <input class="col-xs-3" type="text" name="driver" placeholder="Driver" [(ngModel)]="lap.driver"/>
        <input class="col-xs-3" type="text" name="lapTime" placeholder="Lap Time" autocomplete="off" [(ngModel)]="lap.lapTime"/>
        <input class="col-xs-3" type="text" name="trackLocation" placeholder="Track Location" [(ngModel)]="lap.trackLocation"/>
        <input class="col-xs-3" type="text" name="trackVariation" placeholder="Track Variation" [(ngModel)]="lap.trackVariation"/>
    </div>
    <div class="row">
        <input class="col-xs-4" type="text" name="carName" placeholder="Car Name" [(ngModel)]="lap.carName"/>
        <input class="col-xs-4" type="text" name="carClassName" placeholder="Car Class" [(ngModel)]="lap.carClassName"/>
        <input class="col-xs-4" type="text" name="lapTimestamp" placeholder="Date" [(ngModel)]="lap.lapTimestamp"/>
    </div>
    <div class="row">
        <a href="#" class="btn btn-success" (click)="onSave()">Save</a>
        <a href="#" class="btn btn-warning" (click)="onCancel()">Cancel</a>
        <a href="#" class="btn btn-danger btn-delete" (click)="onDelete()" *ngIf="lap._id">Delete</a>
    </div>
</form>

<!-- Small modal -->
<!--
<button type="button" class="btn btn-primary" (click)="smModal.show()">Small modal</button>

<div bsModal #smModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" aria-label="Close" (click)="smModal.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">Small modal</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
    </div>
  </div>
</div>
-->
`,
    directives: [
        MODAL_DIRECTVES
    ],
    viewProviders: [
        BS_VIEW_PROVIDERS
    ]
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

    @Output()
    deleted = new EventEmitter();

    constructor(private lapService:LapService) {
    }

    onSave() {
        this.lapService.saveLap(this.lap).subscribe(lap => {
            this.lap = lap;
            this.saved.emit(this.lap);
        });
    }

    onCancel() {
        this.cancelled.emit(this.lap);
    }

    onDelete() {
        var result = confirm("Are you sure you want to delete this lap?");
        if (result) {
            this.lapService.deleteLap(this.lap).subscribe(lap => {
                this.deleted.emit(this.lap);
            });
        }
    }
}