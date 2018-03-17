import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { order } from '../shared/order.model';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import { orderService } from './orders.service';
import { orderBody } from '../shared/order-body.model';
@Component({
    templateUrl: `orders.component.html`
})
export class OrdersComponent implements OnInit {

    private orderService : orderService
    static URL = 'orders';
    Orders : order[]; 
    order : order;
    orderBodyElement : orderBody;
    orderBody : orderBody[];
    displayedColumns = [ 'Id' , 'Id_provedor' , 'Provedor'];
    displayedColumnsCuerpo = [ 'Id' ,'id_order', 'id_provedor'  , 'id_articulo' , 'articulo' , 'cantidad' ]
    dataSource: MatTableDataSource<order>;
    dataSourceBody : MatTableDataSource<orderBody>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {   
        this.syncronize();          
    }

    syncronize(){
        this.orderService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<order>(data);
                this.dataSource.sort = this.sort;
            }
        );   
    }

    mostrar_cuerpo(code : string){
        this.orderService.readBody(parseInt(code)).subscribe(
            data => {
                this.dataSourceBody = new MatTableDataSource<orderBody>(data);
                this.dataSourceBody.sort = this.sort;
            }
        )
        alert("servicio y si existe el id, vamos a buscar el cuerpo")
    }

    agregar_si_existe(code : string){
        alert("llamar al servicio, cno el codigo , en el servicio, consultar si existe ese id de order, si-> actualizar el order body, no->pues nada")
    }
}