import { OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { Grafic, FormatDate } from './format-date';
import { MatSnackBar } from '@angular/material';
declare let google: any;
let chart: any;
let totalshoppingCart: number;
let controlDates: number;
const month = FormatDate.months;

export class GraficMonthsAreaComponent {

    constructor(private ticketService: TicketService, public snackBar: MatSnackBar) {
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            const data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.AreaChart(document.getElementById(Grafic.AREA_MONTHS));
            chart.draw(data);
        }
    }

    create(id) {
        this.ticketService.readAllBetweenDates(id).subscribe(
            data => {
                console.log(data);
                if (data.length === 0) {
                    this.snackBar.open('There is not information', 'X', {
                        duration: 2000,
                    });
                } else {
                    read(data);
                }
            }
        );

        function read(data: any) {
            let dateStart;
            let dateFinish;
            let salesList = [];
            totalshoppingCart = 0;
            controlDates = 1;
            data[controlDates]['creationDate'] = new Date();
            dateFinish = data[controlDates]['creationDate'].getMonth();

            for (let i = 0; i < data.length; i++) {
                data[i]['creationDate'] = new Date();
                dateStart = data[i]['creationDate'].getMonth();
                if (dateStart === dateFinish) {
                    totalshoppingCart += data[i]['shoppingCart'];
                    salesList = ['' + month[dateStart].viewValue + '', totalshoppingCart];
                    controlDates++;
                } else {
                    salesList.push(['' + month[dateFinish].viewValue + '', data[i]['shoppingCart']]);
                }
            }
            google.charts.setOnLoadCallback(draw(salesList));
        }

        function draw(salesList) {
            const dataAPI = google.visualization.arrayToDataTable([
                ['Date', 'Sales Product'], salesList]);
            const options = {
                hAxis: { title: 'Months', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Sales', minValue: 0 }
            };
            chart = new google.visualization.AreaChart(document.getElementById(Grafic.AREA_MONTHS));
            chart.draw(dataAPI, options);
        }
    }
}
