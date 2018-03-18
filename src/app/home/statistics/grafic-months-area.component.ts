import { OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { Grafic, FormatDate } from './format-date';

declare let google: any;
let chart: any;

export class GraficMonthsAreaComponent {

    constructor(private ticketService: TicketService) {
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            const data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.AREA_MONTHS));
            chart.draw(data);
        }
    }

    create(id) {
        this.ticketService.readAllBetweenDates(id).subscribe(
            data => {
                console.log(data);
            }
        );
    }
}
