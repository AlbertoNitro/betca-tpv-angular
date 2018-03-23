import {Component, DoCheck, Inject, IterableDiffers, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Shopping } from '../../shared/shopping.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html'
})
export class EditTicketDialogComponent implements OnInit  {
  ticketId: string = this.data.ticket.id;
  displayedColumns = ['numLineShopping', 'description', 'retailPrice', 'amount', 'discount', 'committed'];
  listAmountsShoppings: number[];
  listCommitedsShoppings: boolean[];
  dataSource: MatTableDataSource<Shopping>;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.dataSource = new MatTableDataSource<Shopping>(this.data.ticket.shoppingList);
    this.listAmountsShoppings = [];
    this.listCommitedsShoppings = [];
    for (const shopping of this.data.ticket.shoppingList) {
      this.listAmountsShoppings.push(shopping.amount);
      this.listCommitedsShoppings.push(shopping.committed);
    }
  }
  ngOnInit() {
  }
  decreaseAmount(indexShopping: number) {
    if (this.listAmountsShoppings[indexShopping] > 0) {
      this.listAmountsShoppings[indexShopping]--;
      if (this.listAmountsShoppings[indexShopping] === 0 && !this.data.ticket.shoppingList[indexShopping].committed) {
        alert('Es 0 y estaba no entregado');
        this.listCommitedsShoppings[indexShopping] = true;
      }
    }
  }
  increaseAmount(indexShopping: number) {
    if (this.listAmountsShoppings[indexShopping] < this.data.ticket.shoppingList[indexShopping].amount) {
      this.listAmountsShoppings[indexShopping]++;
    }
  }
  isMaxAmountShopping(indexShopping: number): boolean {
    return this.listAmountsShoppings[indexShopping] === this.data.ticket.shoppingList[indexShopping].amount;
  }
  isMinAmountShopping(indexShopping: number): boolean {
    return this.listAmountsShoppings[indexShopping] === 0;
  }
}
