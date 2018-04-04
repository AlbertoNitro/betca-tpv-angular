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
    public doughnutChartLabels: string[] = ['product1', 'product2', 'product3'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType = 'doughnut';

    ngOnInit(): void { }

    refreshHistoricalProductsChart(): void {
        this.disabled = true;

        // hacer llamada al servicio
        this.doughnutChartLabels = ['product1', 'product2', 'product3', 'product4', 'product5', 'product6'];
        const aux = [350, 450, 100, 350, 450, 100];
        this.doughnutChartData.length = 0;
        aux.forEach(element => {
            this.doughnutChartData.push(element);
        });

        this.disabled = false;
    }

    private showError(msg: string) {
        this.snackBar.open(msg, 'Error', {
            duration: 8000
        });
    }
}
