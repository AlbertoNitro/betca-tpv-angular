import { OnInit } from '@angular/core';
import { CashierClosing } from '../shared/cashier-closing.model';
import { CashierService } from '../shared/cashier.service';
import { Grafic, FormatDate } from './format-date';
import { MatSnackBar } from '@angular/material';
declare let google: any;
let chart: any;
let salesList = [];
export class GraficYearAreaComponent {

    constructor(private cashierService: CashierService, public snackBar: MatSnackBar) {
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            const data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.AreaChart(document.getElementById(Grafic.AREA_YEAR));
            chart.draw(data);
        }
    }

    search(dateStart, dateFinish) {
        this.cashierService.readAllDatesBetween(FormatDate.yearTimeStart(dateStart), FormatDate.yearTimeFinish(dateFinish)).subscribe(
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
                const years = new Date(give.closureDate).getFullYear();
                const sales_Card = Number(give.salesCard);
                const sales_Cash = Number(give.salesCash);
                return { year: years, salesCard: sales_Card, salesCash: sales_Cash };
            };

            const reducer = (group, all) => {
                const i = group.findIndex(give => (give.year === all.year));
                if (i === -1) {
                    return [...group, all];
                }

                group[i].salesCard += all.salesCard;
                group[i].salesCash += all.salesCash;
                return group;
            };
            const dataMap = data.map(mapper).reduce(reducer, []);


            for (let i = 0; i < dataMap.length; i++) {
                salesList[i] = ['' + dataMap[i]['year'] + '', dataMap[i]['salesCard'], dataMap[i]['salesCash']];
            }
            salesList.unshift(['Date', 'Sales Card', 'Sales Cash']);
            google.charts.setOnLoadCallback(draw);
        }

        function draw() {
            const dataAPI = google.visualization.arrayToDataTable(salesList);
            const options = {
                hAxis: { title: 'Years', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Sales', minValue: 0 }
            };
            chart = new google.visualization.AreaChart(document.getElementById(Grafic.AREA_YEAR));
            chart.draw(dataAPI, options);
        }
    }
}
