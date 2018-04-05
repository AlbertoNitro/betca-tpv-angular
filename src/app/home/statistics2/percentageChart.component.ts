import { OnInit, ViewChild, Component, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { BaseChartDirective } from 'ng2-charts';
import { FormControl } from '@angular/forms';
import { TicketService } from '../shared/ticket.service';


@Component({
    selector: 'app-percetage-chart',
    templateUrl: 'percentageChart.component.html',
    styleUrls: [`statistics2.component.css`],
    providers: []
})

export class PercentageChartComponent implements OnInit {

    @ViewChild('chartPercentage') chartPercentage: BaseChartDirective;
    initDate = new FormControl(new Date());
    endDate = new FormControl(new Date());
    constructor(private ticketService: TicketService, private snackBar: MatSnackBar) { }
    // Atributos gráfica percentage
    public disabled = false;
    public doughnutChartLabels: string[] = [];
    public doughnutChartData: number[] = [];
    public doughnutChartType = 'doughnut';

    ngOnInit(): void { }

    refreshPercentageChart(): void {
        this.disabled = true;
        // hacer llamada al servicio
        this.ticketService.readNumProductSoldBetweenDates(
            new Date(this.initDate.value),
            new Date(this.endDate.value)
        ).subscribe(
            data => {
                if (data.length > 0) {

                    const auxLabels = [];
                    this.doughnutChartData.length = 0;
                    for (const item of data) {
                        auxLabels.push(item.productName);
                        this.doughnutChartData.push(item.quantity);
                    }
                    this.doughnutChartLabels = auxLabels;

                } else {
                    this.showError('No available data');
                }
            },
            error => {
                this.showError('Server not found, try again in a few minutes');
                this.disabled = false;
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
