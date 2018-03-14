import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';

declare let google: any;
let chart: any;
let salesList = [];

@Component({
    templateUrl: `statistics.component.html`,
    styleUrls: [`statistics.component.css`],
})
export class StatisticsComponent implements OnInit {
    static URL = 'statistics';
    dataSource: MatTableDataSource<CashierClosure>;
    private dateStart: Date;
    private dateEnd: Date;

    years = ['2018', '2019', '2020', '2021', '2022'];
    mounths = [{ value: '01', viewValue: 'Ene' }, { value: '02', viewValue: 'Feb' }, { value: '03', viewValue: 'Mar' },
    { value: '04', viewValue: 'Abr' }, { value: '05', viewValue: 'May' }, { value: '06', viewValue: 'Jun' },
    { value: '07', viewValue: 'Jul' }, { value: '08', viewValue: 'Ago' }, { value: '09', viewValue: 'Sep' },
    { value: '10', viewValue: 'Oct' }, { value: '11', viewValue: 'Nov' }, { value: '12', viewValue: 'Dic' }]

    constructor(private cashierService: CashierService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }

    ngOnInit(): void {
        google.charts.setOnLoadCallback(draw);
        function draw() {
            let data = google.visualization.arrayToDataTable([['', ''], ['', 0]]);
            chart = new google.visualization.AreaChart(document.getElementById('areaA'));
            chart.draw(data);
            chart = new google.visualization.ColumnChart(document.getElementById('columna'));
            chart.draw(data);
            chart = new google.visualization.AreaChart(document.getElementById('areaM'));
            chart.draw(data);
        }
    }

    create(code: string, dateI: number, dateF: number, titleh: string, titlev: string, estado: string) {

        if (estado === 'areaA') {
            this.dateStart = new Date(dateI + "-01-01T00:00:00Z");
            this.dateEnd = new Date(dateF + "-12-31T00:00:00Z");
            this.readDates();
            google.charts.setOnLoadCallback(draw);
        }

        if (estado === 'columna') {
            this.dateStart = new Date();
            let year = this.dateStart.getFullYear();
            this.dateStart = new Date(year + "-" + dateI + "-01T00:00:00Z");
            this.dateEnd = new Date(year + "-" + dateF + "-31T00:00:00Z");
            this.readDates();
            google.charts.setOnLoadCallback(draw);
        } else {
            this.dateStart = new Date();
            let year = this.dateStart.getFullYear();
            this.dateStart = new Date(year + "-01-01T00:00:00Z");
            this.dateEnd = new Date(year + "-12-31T00:00:00Z");
            this.readDates();
            google.charts.setOnLoadCallback(draw);

        }

        function draw() {
            let dataAPI = google.visualization.arrayToDataTable([
                ['closureDate', 'salesCard', 'salesCash'],
                // articleList
            ]);
            let options = {
                hAxis: { title: titleh, titleTextStyle: { color: '#333' } },
                vAxis: { title: titlev, minValue: 0 }
            };
            if (estado === 'columna')
                chart = new google.visualization.ColumnChart(document.getElementById(estado));
            chart = new google.visualization.AreaChart(document.getElementById(estado));
            chart.draw(dataAPI, options);
        }
    }


    readDates() {

        this.cashierService.readAll(this.dateStart).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<CashierClosure>(data);
            }
        );

           let totalsalesCash = 0;
           let totalsalesCard = 0;
           let fecha;
           let aux = 1;
   
           this.testCashierClosure[aux].closureDate = new Date();
           for (var i = 0; i < this.testCashierClosure.length; i++) {
            this.testCashierClosure[i].closureDate = new Date();
               if (this.testCashierClosure[i].closureDate === this.testCashierClosure[aux].closureDate) {
                salesList.push([this.testCashierClosure[i].salesCard, this.testCashierClosure[i].salesCash, this.testCashierClosure[i].closureDate]);
                   aux++;
               } else {
                salesList = [];
                   totalsalesCash += this.testCashierClosure[i].salesCash;
                   totalsalesCard += this.testCashierClosure[i].salesCard;
                   salesList = [totalsalesCash, totalsalesCard, this.testCashierClosure[i].closureDate];
   
               }
           }
    }


      testCashierClosure: CashierClosure[] = [
        {salesCard: 1, salesCash: 1, closureDate: this.dateEnd},
        {salesCard: 2, salesCash: 2, closureDate: this.dateEnd},
        {salesCard: 3, salesCash: 3, closureDate: this.dateEnd}
      ];

} 
 
