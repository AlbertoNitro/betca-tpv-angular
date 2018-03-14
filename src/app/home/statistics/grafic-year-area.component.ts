import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { GRAFIC, FormatDate } from './format-date';

declare let google: any;
let chart: any;
let dateStart: any;
let dateEnd: any;
let totalsalesCash: number;
let totalsalesCard: number;
let salesList: object;
export class GraficYearAreaComponent {

    dataSource: MatTableDataSource<CashierClosure>;

    constructor(private cashierService: CashierService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    init() {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            let data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.AreaChart(document.getElementById(GRAFIC.AREA_YEAR));
            chart.draw(data);
        }
    }

    create(dateI, dateF) {
        dateStart = FormatDate.yearTimeInit(dateI);
        dateEnd = FormatDate.yearTimeEnd(dateF);
        this.read();
        // let datos = this.readData(dateI, dateF);
        google.charts.setOnLoadCallback(draw);

        function draw() {
            const dataAPI = google.visualization.arrayToDataTable([
                ['closureDate', 'salesCard', 'salesCash'],
                ['datos', 100, 400]
            ]);
            const options = {
                hAxis: { title: 'Años', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Ventas', minValue: 0 }
            };
            chart = new google.visualization.AreaChart(document.getElementById(GRAFIC.AREA_YEAR));
            chart.draw(dataAPI, options);
        }
    }

    synchronize() {
        this.cashierService.readAll(dateStart).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<CashierClosure>(data);
            }
        );
    }


    read() {
        this.synchronize();
        totalsalesCash = 0;
        totalsalesCard = 0;
        console.log(this.synchronize());
        /*   for (var i = 1; i < this.dataSource.data.length; i++) {
               this.dataSource.data[i]["closureDate"] = new Date();
               totalsalesCard += this.dataSource.data[i]["salesCard"];
               totalsalesCash += this.dataSource.data[i]["salesCash"];
           }*/
        salesList = (['' + 2018 + '', totalsalesCard, totalsalesCash]);

    }
}
