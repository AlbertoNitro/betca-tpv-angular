import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';

@Component({
    templateUrl: 'article-creation-edit-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ArticleCreationEditDialogComponent implements OnInit {
    edit: boolean;
    article: Article;

    constructor(public dialogRef: MatDialogRef<ArticleCreationEditDialogComponent>,
        private articleService: ArticleService) {
    }

    ngOnInit(): void {
        if (!this.article) {
            this.article = { code: '', description: '', reference: '', retailPrice: undefined, stock: undefined};
        }
    }

    create(): void {
        this.articleService.articleGenerateObservable(this.article).subscribe(
            data => this.dialogRef.close()
        );
    }

    save(): void {
        this.articleService.putObservable(this.article).subscribe(
            data => this.dialogRef.close()
        );
    }
}
