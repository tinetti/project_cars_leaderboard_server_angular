System.register(["@angular/core", "./lap-editor.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, lap_editor_component_1;
    var LapListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lap_editor_component_1_1) {
                lap_editor_component_1 = lap_editor_component_1_1;
            }],
        execute: function() {
            LapListComponent = (function () {
                function LapListComponent() {
                }
                LapListComponent.prototype.onLapSelected = function (lap) {
                    this.selectedLap = lap;
                };
                LapListComponent.prototype.onSave = function () {
                    console.log("onSave");
                    this.selectedLap = null;
                };
                LapListComponent.prototype.onCancel = function () {
                    console.log("onCancel");
                    this.selectedLap = null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], LapListComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], LapListComponent.prototype, "laps", void 0);
                LapListComponent = __decorate([
                    core_1.Component({
                        selector: "lap-list",
                        template: "\n\n<div class=\"panel panel-success\">\n    <div class=\"panel-heading\">\n        <span class=\"panel-title\">{{title}}</span>  \n    </div>\n    \n    <div class=\"lap-list-container\">\n        <div class=\"row lap-list-row lap-list-header-row\">\n            <div class=\"col-xs-2 lap-list-header-cell\">Driver</div>\n            <div class=\"col-xs-3 lap-list-header-cell\">Lap Time</div>\n            <div class=\"col-xs-4 lap-list-header-cell\">Track</div>\n            <div class=\"col-xs-3 lap-list-header-cell\">Car</div>\n        </div>\n        \n        <div *ngFor=\"let lap of laps\">\n            <lap-editor *ngIf=\"lap == selectedLap\" [lap]=\"selectedLap\" [title]=\"'Edit Lap'\" (saved)=\"onSave()\" (cancelled)=\"onCancel()\"></lap-editor>\n            <div *ngIf=\"lap != selectedLap\" class=\"row lap-list-row lap-list-detail-row\">\n                <div class=\"col-xs-2 lap-list-detail-cell\" (click)=\"onLapSelected(lap)\">{{lap.driver}}</div>\n                <div class=\"col-xs-3 lap-list-detail-cell\" (click)=\"onLapSelected(lap)\">{{lap.lapTime}}</div>\n                <div class=\"col-xs-4 lap-list-detail-cell\" (click)=\"onLapSelected(lap)\">{{lap.trackLocation}} - {{lap.trackVariation}}</div>\n                <div class=\"col-xs-3 lap-list-detail-cell\" (click)=\"onLapSelected(lap)\">{{lap.carName}} ({{lap.carClassName}})</div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                        directives: [
                            lap_editor_component_1.LapEditorComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LapListComponent);
                return LapListComponent;
            }());
            exports_1("LapListComponent", LapListComponent);
        }
    }
});
//# sourceMappingURL=lap-list.component.js.map