import { Component, ViewChild, OnInit } from '@angular/core';


@Component({
    templateUrl: `schedule.component.html`,
    styleUrls: [`schedule.component.css`],
    providers: []
})
export class ScheduleComponent implements OnInit {
    static URL = 'schedule';

    constructor() {
    }

    ngOnInit(): void {

    }

    refreshChart(event): void {
        console.log(event);
    }

}
