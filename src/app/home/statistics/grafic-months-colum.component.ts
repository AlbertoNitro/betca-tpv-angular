import { OnInit } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { Grafic, FormatDate } from './format-date';
import { MatSnackBar } from '@angular/material';
declare let google: any;
let chart: any;
let totalsalesCash: number;
let totalsalesCard: number;
let controlDates: number;
const month = FormatDate.months;
export class GraficMonthsColumnComponent {

    constructor(private cashierService: CashierService, public snackBar: MatSnackBar) {
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            const data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.COLUNM_MONTHS));
            chart.draw(data);
        }
    }

    create(monthStart, monthFinish) {
        this.cashierService.readAllBetweenDates(FormatDate.monthsTimeStart(monthStart), FormatDate.monthsTimeFinish(monthFinish)).subscribe(
            data => {
                if (data.length === 0) {
                    this.snackBar.open('There is not information, check the periods', 'X', {
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
            totalsalesCash = 0;
            totalsalesCard = 0;
            controlDates = 1;
            data[controlDates]['closureDate'] = new Date();
            dateFinish = data[controlDates]['closureDate'].getMonth();

            for (let i = 0; i < data.length; i++) {
                data[i]['closureDate'] = new Date();
                dateStart = data[i]['closureDate'].getMonth();
                if (dateStart === dateFinish) {
                    totalsalesCard += data[i]['salesCard'];
                    totalsalesCash += data[i]['salesCash'];
                    salesList = ['' + month[dateStart].viewValue + '', totalsalesCard, totalsalesCash];
                    controlDates++;
                } else {
                    salesList.push(['' + month[dateFinish].viewValue + '', data[i]['salesCard'], data[i]['salesCash']]);
                }
            }
            google.charts.setOnLoadCallback(draw(salesList));
        }

        function draw(salesList) {
            const dataAPI = google.visualization.arrayToDataTable([
                ['Date', 'Sales Card', 'Sales Cash'], salesList]);
            const options = {
                hAxis: { title: 'Months', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Sales', minValue: 0 }
            };
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.COLUNM_MONTHS));
            chart.draw(dataAPI, options);
        }
    }
}
