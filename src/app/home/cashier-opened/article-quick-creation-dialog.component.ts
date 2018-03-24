import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShoppingCartService } from './shopping-cart.service';
import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';
import { MatSnackBar } from '@angular/material';



@Component({
    templateUrl: 'article-quick-creation-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ArticleQuickCreationDialogComponent {

    public code;
    public description: string;
    public retailPrice: number;

    constructor(
        public articleService: ArticleService,
        public dialogRef: MatDialogRef<ArticleQuickCreationDialogComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.code = data.code;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    sendData() {
        const article: Article = { code: this.code, reference: null,
             description: this.description, retailPrice: this.retailPrice, stock: null };
        this.articleService.articleGenerateObservable(article).subscribe(
            data => {
                this.successful();
                this.dialogRef.close();
            },
            error => {
                this.unsuccessful();
            }
        );
    }
    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }

    private unsuccessful() {
        this.snackBar.open('Unsuccessful', '', {
            duration: 2000
        });
    }
}
