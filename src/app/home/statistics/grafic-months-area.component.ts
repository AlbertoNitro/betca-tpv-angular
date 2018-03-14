import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { MONTHS, GRAFIC, FormatDate } from './format-date';

declare let google: any;
let chart: any;

export class GraficMonthsAreaComponent {

    dataSource: MatTableDataSource<Ticket>;

    constructor(private cashierService: TicketService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            let data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.ColumnChart(document.getElementById(GRAFIC.AREA_MONTHS));
            chart.draw(data);
        }
    }

    create(code : string) {
        this.readData(code);
        google.charts.setOnLoadCallback(draw);

        function draw() {
            let dataAPI = google.visualization.arrayToDataTable([
                ['closureDate', 'salesCard'],
                ['2018', 1]
            ]);
            let options = {
                hAxis: { title: 'Meses', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };
            chart = new google.visualization.ColumnChart(document.getElementById(GRAFIC.AREA_MONTHS));
            chart.draw(dataAPI, options);
        }
    }

    readData(code) {
     //   dateStart = FormatDate.monthsTimeInit(dateI);
       // dateEnd = FormatDate.monthsTimeEnd(dateF);
        this.cashierService.readAll(code).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Ticket>(data);
                console.log(this.dataSource.data);
            }
        );
    }
}