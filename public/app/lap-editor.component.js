System.register(["@angular/core", "./lap"], function(exports_1, context_1) {
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
    var core_1, lap_1;
    var LapEditorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lap_1_1) {
                lap_1 = lap_1_1;
            }],
        execute: function() {
            LapEditorComponent = (function () {
                function LapEditorComponent() {
                    this.cancelled = new core_1.EventEmitter();
                    this.saved = new core_1.EventEmitter();
                }
                LapEditorComponent.prototype.onSave = function () {
                    this.saved.emit(this.lap);
                };
                LapEditorComponent.prototype.onCancel = function () {
                    this.cancelled.emit(this.lap);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], LapEditorComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', lap_1.Lap)
                ], LapEditorComponent.prototype, "lap", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LapEditorComponent.prototype, "cancelled", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LapEditorComponent.prototype, "saved", void 0);
                LapEditorComponent = __decorate([
                    core_1.Component({
                        selector: "lap-editor",
                        template: "\n<form class=\"save-lap navbar-form navbar-left\">\n    <div class=\"row\">\n        <input type=\"hidden\" name=\"_id\" value=\"\"/>\n        <input type=\"hidden\" name=\"createdAt\" value=\"\"/>\n        <input type=\"hidden\" name=\"createdBy\" value=\"\"/>\n        <input class=\"col-xs-2\" type=\"text\" name=\"driver\" placeholder=\"Driver\" [(ngModel)]=\"lap.driver\"/>\n        <input class=\"col-xs-2\" type=\"text\" name=\"lapTime\" placeholder=\"Lap Time\" autocomplete=\"off\" [(ngModel)]=\"lap.lapTime\"/>\n        <input class=\"col-xs-2\" type=\"text\" name=\"trackLocation\" placeholder=\"Track Location\" [(ngModel)]=\"lap.trackLocation\"/>\n        <input class=\"col-xs-2\" type=\"text\" name=\"trackVariation\" placeholder=\"Track Variation\" [(ngModel)]=\"lap.trackVariation\"/>\n        <input class=\"col-xs-2\" type=\"text\" name=\"carName\" placeholder=\"Car Name\" [(ngModel)]=\"lap.carName\"/>\n        <input class=\"col-xs-2\" type=\"text\" name=\"carClassName\" placeholder=\"Car Class\" [(ngModel)]=\"lap.carClassName\"/>\n    </div>\n    <div class=\"row\">\n        <a href=\"#\" class=\"btn btn-success\" (click)=\"onSave()\">Save</a>\n        <a href=\"#\" class=\"btn btn-danger\" (click)=\"onCancel()\">Cancel</a>\n    </div>\n</form>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], LapEditorComponent);
                return LapEditorComponent;
            }());
            exports_1("LapEditorComponent", LapEditorComponent);
        }
    }
});
//# sourceMappingURL=lap-editor.component.js.map