import { OnInit } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { Grafic, FormatDate } from './format-date';
import { MatSnackBar } from '@angular/material';
declare let google: any;
let chart: any;
let salesList = [];
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

    search(monthStart, monthFinish) {
        this.cashierService.readAllDatesBetween(FormatDate.monthsTimeStart(monthStart), FormatDate.monthsTimeFinish(monthFinish)).subscribe(
            data => {
                if (data.length === 0) {
                    this.snackBar.open('There is not information, check the periods', 'X', {
                        duration: 2000,
                    });
                } else {
                    salesList = [];
                    read(data);
                }
            }
        );

        function read(data: any) {

            const mapper = give => {
                const months = new Date(give.closureDate).getMonth();
                const sales_Card = Number(give.salesCard);
                const sales_Cash = Number(give.salesCash);
                return { month: months, salesCard: sales_Card, salesCash: sales_Cash };
            };

            const reducer = (group, all) => {
                const i = group.findIndex(give => (give.month === all.month));
                if (i === -1) {
                    return [...group, all];
                }

                group[i].salesCard += all.salesCard;
                group[i].salesCash += all.salesCash;
                return group;
            };
            const dataMap = data.map(mapper).reduce(reducer, []);


            for (let i = 0; i < dataMap.length; i++) {
                const dateStart = dataMap[i]['month'];
                salesList[i] = ['' + month[Number(dateStart)].viewValue + '', dataMap[i]['salesCard'], dataMap[i]['salesCash']];
            }
            salesList.unshift(['Date', 'Sales Card', 'Sales Cash']);
            google.charts.setOnLoadCallback(draw);
        }

        function draw() {
            console.log(salesList);
            const dataAPI = google.visualization.arrayToDataTable(salesList);
            const options = {
                hAxis: { title: 'Months', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Sales', minValue: 0 }
            };
            chart = new google.visualization.ColumnChart(document.getElementById(Grafic.COLUNM_MONTHS));
            chart.draw(dataAPI, options);
        }
    }
}
