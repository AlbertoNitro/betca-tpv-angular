import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShoppingCartService } from './shopping-cart.service';
import { Article } from '../shared/article.model';


@Component({
    templateUrl: 'shopping-cart-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ShoppingCartDialogComponent {

    public code;
    public description: string;
    public retailPrice: number;

    constructor(
        public shoppingCartService: ShoppingCartService,
        public dialogRef: MatDialogRef<ShoppingCartDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.code = data.code;
            //console.log("-----"+this.fastArticle);
        }

    onNoClick(): void {
        this.dialogRef.close();
    }
    sendData() {
        let article: Article = {code: this.code, reference: null, description: this.description, retailPrice: this.retailPrice, stock: null}
        this.shoppingCartService.fastArticleGenerate(article);
        // = {code: code, description: detalles, retailPrice: price };
    }

}
