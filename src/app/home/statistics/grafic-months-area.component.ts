import {TicketService} from '../shared/ticket.service';
import {FormatDate, Grafic} from './format-date';
import {MatSnackBar} from '@angular/material';

declare let google: any;
let chart: any;
let salesList = [];
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

  search(id) {
    this.ticketService.readIdArticleDatesBetween(id).subscribe(
      data => {
        if (data.length === 0) {
          this.snackBar.open('There is not information', 'X', {
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
        const months = new Date(give.creationDate).getMonth();
        const countArticle = Number(give.shoppingCart);
        return {month: months, sales: countArticle};
      };

      const reducer = (group, all) => {
        const i = group.findIndex(give => (give.month === all.month));
        if (i === -1) {
          return [...group, all];
        }

        group[i].sales += all.sales;
        return group;
      };
      const dataMap = data.map(mapper).reduce(reducer, []);

      for (let i = 0; i < dataMap.length; i++) {
        const dateStart = dataMap[i]['month'];
        salesList[i] = ['' + month[Number(dateStart)].viewValue + '', dataMap[i]['sales']];
      }

      salesList.unshift(['Date', 'Sales Product']);
      google.charts.setOnLoadCallback(draw);
    }

    function draw() {
      const dataAPI = google.visualization.arrayToDataTable(salesList);
      const options = {
        hAxis: {title: 'Months', titleTextStyle: {color: '#333'}},
        vAxis: {title: 'Sales', minValue: 0}
      };
      chart = new google.visualization.AreaChart(document.getElementById(Grafic.AREA_MONTHS));
      chart.draw(dataAPI, options);
    }
  }
}
