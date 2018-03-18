import { OnInit, ViewChild, Component, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { BaseChartDirective } from 'ng2-charts';
import { TicketService } from '../shared/ticket.service';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-historic-chart',
    templateUrl: `historicChart.component.html`,
    styleUrls: [`statistics2.component.css`],
    providers: []
})

export class HistoricChartComponent implements OnInit {

    @ViewChild('chartHistoric') chartHistoric: BaseChartDirective;
    initDate = new FormControl(new Date());
    endDate = new FormControl(new Date());
    constructor(private ticketService: TicketService, private snackBar: MatSnackBar) { }
    // Atributos gráfica Historical products
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Producto A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Producto B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Producto C' }

    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    public lineChartLegend = true;
    public lineChartType = 'line';
    public disabled = false;

    ngOnInit(): void { }

    refreshHistoricalProductsChart(): void {
        this.disabled = true;

        // hacer llamada al servicio
        this.ticketService.readNumProductsBeweenDates(
            new Date(this.initDate.value),
            new Date(this.endDate.value)
        ).subscribe(
            data => {
                if (data.length > 0) {

                    const lineChartDataAux = new Array<any>();
                    const lineChartLabelsAux = new Array<any>();

                    let numMonths = 0;
                    for (const item of data) {
                        console.log(item);
                        if (item.numProductsPerMonth.length > 0) {
                            numMonths = item.numProductsPerMonth.length;
                            lineChartDataAux.push({ data: item.numProductsPerMonth, label: item.productName });
                        }
                    }

                    const dateAux = new Date(this.initDate.value);
                    for (let i = 0; i < numMonths; i++) {
                        const month = dateAux.toLocaleString(window.navigator.languages, { month: 'long' });
                        lineChartLabelsAux.push(month);
                        dateAux.setMonth(dateAux.getMonth() + 1);
                    }

                    if (this.chartHistoric !== undefined && lineChartDataAux.length > 0) {
                        this.lineChartData = lineChartDataAux;
                        this.lineChartLabels = lineChartLabelsAux;

                        this.chartHistoric.chart.destroy();
                        this.chartHistoric.chart = 0;

                        this.chartHistoric.datasets = this.lineChartData;
                        this.chartHistoric.labels = this.lineChartLabels;
                        this.chartHistoric.ngOnInit();
                    } else {
                        this.showError('No available data');
                    }
                } else {
                    this.showError('No available data');
                }
            },
            error => {
                this.showError('Server not found, try again in a few minutes');
            },
            () => {
                this.disabled = false;
            }
        );
    }

    private showError(msg: string) {
        this.snackBar.open(msg, 'Error', {
            duration: 8000
        });
    }
}
