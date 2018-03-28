import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Scheduler } from '../shared/scheduler.model';

@Component({
    templateUrl: `schedule.component.html`,
    styleUrls: [`schedule.component.css`],
    providers: []
})
export class ScheduleComponent implements OnInit {
    static URL = 'schedule';
    private schedulerList: Scheduler[] = [];
    dataSource: MatTableDataSource<Scheduler>;
    displayedColumns = ['dateTime', 'title', 'description'];

    constructor() {
      this.schedulerList.push({ dateTime: '01/01/2018 13:56', title: 'hola', description: 'Eoeo'});
      this.dataSource = new MatTableDataSource<Scheduler>(this.schedulerList);
    }

    ngOnInit(): void {

    }
}
