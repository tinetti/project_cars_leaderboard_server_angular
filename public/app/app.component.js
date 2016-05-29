System.register(["@angular/core", "./lap-editor.component", "./lap-list.component", "./lap.service"], function(exports_1, context_1) {
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
    var core_1, lap_editor_component_1, lap_list_component_1, lap_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lap_editor_component_1_1) {
                lap_editor_component_1 = lap_editor_component_1_1;
            },
            function (lap_list_component_1_1) {
                lap_list_component_1 = lap_list_component_1_1;
            },
            function (lap_service_1_1) {
                lap_service_1 = lap_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(lapService) {
                    this.lapService = lapService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getLaps();
                };
                AppComponent.prototype.getLaps = function () {
                    var _this = this;
                    this.lapService.getLaps().then(function (laps) { return _this.laps = laps; });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n<div class=\"container\">\n    <div class=\"page-header\">\n        <h1><img src=\"/images/project_cars_logo.png\"> Leaderboard</h1>\n    </div>\n    \n    <!--<lap-editor [title]=\"'Enter New Lap'\"></lap-editor>-->\n  \n    <lap-list [laps]=\"laps\" [title]=\"'Saved Laps'\"></lap-list>\n</div>\n",
                        directives: [
                            lap_editor_component_1.LapEditorComponent,
                            lap_list_component_1.LapListComponent
                        ],
                        providers: [
                            lap_service_1.LapService
                        ]
                    }), 
                    __metadata('design:paramtypes', [lap_service_1.LapService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map