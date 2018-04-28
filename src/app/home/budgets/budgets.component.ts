import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

import {Budget} from '../shared/budget.model';
import {BudgetService} from '../shared/budget.service';

@Component({
  templateUrl: 'budgets.component.html'
})
export class BudgetsComponent {
  static URL = 'budgets';

  title = 'Budgets management';
  columns = ['id'];
  data: Budget[];

  constructor(private dialog: MatDialog, private budgetService: BudgetService) {
    this.budgetService.readAll().subscribe(
      data => this.data = data
    );
  }

  read(budget: Budget) {
    this.budgetService.read(budget);
  }

}
