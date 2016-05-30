import {Component} from "@angular/core";

// Add the RxJS Observable operators we need in this app.
import "./rxjs-operators";

import {Lap} from "./lap";
import {LapEditorComponent} from "./lap-editor.component";
import {LapListComponent} from "./lap-list.component";
import {LapService} from "./lap.service";

@Component({
    selector: 'my-app',
    template: `
<div class="container">
    <div class="page-header">
        <h1><img src="/images/project_cars_logo.png"> Leaderboard</h1>
    </div>
    
    <!--<lap-editor [title]="'Enter New Lap'"></lap-editor>-->
  
    <lap-list [laps]="laps" [title]="'Saved Laps'"></lap-list>
</div>
`,
    directives: [
        LapEditorComponent,
        LapListComponent
    ],
    providers: [
        LapService
    ]
})

export class AppComponent {
    laps: Lap[];

    constructor(private lapService: LapService) {
    }

    ngOnInit() {
        this.getLaps();
    }

    getLaps() {
        this.lapService.getLaps().subscribe(laps => this.laps = laps);
    }
}
