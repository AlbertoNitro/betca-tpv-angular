import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { order } from '../shared/order.model';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import { orderService } from './orders.service';
import { orderBody } from '../shared/order-body.model';
import { ProviderService } from '../shared/provider.service';
@Component({
    templateUrl: `orders.component.html`
})
export class OrdersComponent implements OnInit {
    static URL = 'orders';
    order : order;
    orderBodyElement : orderBody;
    orderBodyElements: orderBody[];
    orderBodyElementsToPut:orderBody[];
    providerName : string;
    displayedColumns = [ 'Id' , 'provider_id' , 'provider_name','Order_date'];
    displayedColumnsCuerpo = [ 'Id' ,'id_order' , 'id_article' , 'article_name' ]
    dataSource: MatTableDataSource<order>;
    dataSourceBody : MatTableDataSource<orderBody>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog,private orderService : orderService
                , private providerService:ProviderService) {
    }

    ngOnInit(): void {  
        this.syncronize();          
    }

    syncronize(){
        this.orderService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<order>(data);
            }
        );   
    }

    refresh(){
        this.syncronize();
    }

    readOrderBody(code:string){
        this.orderService.readAllOrderBodyByIdOrder(code).subscribe(
            data => {
                this.dataSourceBody = new MatTableDataSource<orderBody>(data);
                this.orderBodyElements = data;
            }
        )
    }

    CreateOrder( idOrder:string ,IdProvider:string){

        this.order = { id: idOrder , provider_id: IdProvider , provider_name: "" };
        this.orderService.createOrder(this.order).subscribe(
            ()=> {
                this.syncronize();
            } );
                        
    }

    addOrderBodyWithCodeOrder( idArticle:string , idOrder:string){
        var fecha = new Date();
        this.orderBodyElement = { id: "".concat(fecha.getMinutes().toString())
                                        .concat(fecha.getMilliseconds().toString()) 
                                , id_article: idArticle 
                                , id_order : idOrder, article_name:""};
        this.orderService.createOrderBodyByIdOrder(this.orderBodyElement).subscribe();
        this.readOrderBody(idOrder);
    }

    CreatefromExistOrder(IdOrderExist:string,idOrderNew:string,IdProvider:string){
        this.CreateOrder(idOrderNew,IdProvider);
        this.readOrderBody(IdOrderExist);
        this.orderBodyElements.forEach(element =>{            
            this.addOrderBodyWithCodeOrder(element.id_article,idOrderNew);
            }            
        ); 
    }
}