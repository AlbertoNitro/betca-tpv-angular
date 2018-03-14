import { Component, ViewChild, OnInit } from '@angular/core';
import { GraficAreaComponent} from'./grafic-year-area.component';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
declare let google: any;

@Component({
    templateUrl: `statistics.component.html`,
    styleUrls: [`statistics.component.css`]
})
export class StatisticsComponent implements OnInit {
    static URL = 'statistics';
    
    constructor(private cashierService: CashierService) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }
    graficAreaComponent = new GraficAreaComponent(this.cashierService);

    ngOnInit(): void {
        this.graficAreaComponent.init();
    }

    graficArea(dateI: number, dateF: number) {

        this.graficAreaComponent.create(dateI, dateF);

    }    
}