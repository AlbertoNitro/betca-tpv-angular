import { Component, ViewChild, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { BaseChartDirective } from 'ng2-charts';


@Component({
    templateUrl: `statistics2.component.html`,
    styleUrls: [`statistics2.component.css`],
    providers: []
})
export class Statistics2Component implements OnInit {
    static URL = 'statistics2';

    constructor() {
    }

    ngOnInit(): void {
    }
}
