import { OnInit, ViewChild, Component, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { BaseChartDirective } from 'ng2-charts';
import { FormControl } from '@angular/forms';
import { TicketService } from '../shared/ticket.service';

@Component({
    selector: 'app-income-comparison-chart',
    templateUrl: 'incomeComparisonChart.component.html',
    styleUrls: ['statistics2.component.css'],
    providers: []
})

export class IncomeComparisonChartComponent implements OnInit {

    @ViewChild('chartIncomeComparison') chartIncomeComparison: BaseChartDirective;
    initDate = new FormControl(new Date());
    endDate = new FormControl(new Date());
    constructor(private ticketService: TicketService, private snackBar: MatSnackBar) { }
    // Atributos gráfica percentage
    public disabled = false;
    public barChartLabels: string[] = ['product1', 'product2'];
    public barChartType = 'bar';
    public barChartLegend = true;
    private benefitLiteral = 'Benefit';
    private priceProductLiteral = 'Price of product';
    public barChartData: any[] = [
        { data: [65, 59], label: this.benefitLiteral },
        { data: [28, 48], label: this.priceProductLiteral }
    ];

    ngOnInit(): void { }

    refreshPercentageChart(): void {
        this.disabled = true;
        // hacer llamada al servicio
        this.ticketService.readComprisionIncome(
            new Date(this.initDate.value),
            new Date(this.endDate.value)
        ).subscribe(
            data => {
                if (data.length > 0) {
                    const benefitData = [];
                    const priceData = [];
                    const auxLabel = [];
                    this.barChartData.length = 0;
                    for (const item of data) {
                        auxLabel.push(item.productName);
                        benefitData.push(item.income);
                        priceData.push(item.productPrice);
                    }

                    this.barChartData.push({ data: benefitData, label: this.benefitLiteral });
                    this.barChartData.push({ data: priceData, label: this.priceProductLiteral });
                    this.barChartLabels = auxLabel;

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
