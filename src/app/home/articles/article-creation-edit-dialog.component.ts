import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Article } from '../shared/article.model';
import { Provider } from '../shared/provider.model';
import { ArticleService } from '../shared/article.service';
import { ProviderService } from '../shared/provider.service';

@Component({
    templateUrl: 'article-creation-edit-dialog.component.html',
    styleUrls: ['articles.component.css']
})
export class ArticleCreationEditDialogComponent implements OnInit {

    editable: boolean;
    article: Article;
    providers: Provider[];

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<ArticleCreationEditDialogComponent>,
        private articleService: ArticleService, private providerService: ProviderService) {

        if (data) {
            this.article = data.article;
            this.editable = data.editable;
        } else {
            this.editable = false;
            this.article = { code: null, description: '', reference: '' };
        }
    }


    ngOnInit(): void {
        this.providerService.readAll().subscribe(
            (providers: Provider[]) => this.providers = providers
        );
        if (!this.article) {
            this.article = { code: '', description: '', retailPrice: undefined };
        }
    }

    isActionCompleted() {
        return this.article.description && this.article.retailPrice && this.article.provider;
    }

    create(): void {
        if (!this.article.code) {
            this.article.code = null;
        } else {
            this.article.code = this.article.code.trim();
            this.article.code = (this.article.code.length === 0) ? null : this.article.code;
        }
        this.articleService.create(this.article).subscribe(
            data => this.dialogRef.close()
        );
    }

    save(): void {
        this.articleService.update(this.article).subscribe(
            data => this.dialogRef.close()
        );
    }

    updateDescription() {
        let prefix = this.providers.find(provider => provider.id === this.article.provider).company;
        prefix = prefix.substring(prefix.indexOf('[') + 1, prefix.indexOf(']'));
        if (prefix !== '') {
            this.article.description = prefix + ' - ' + this.article.description;
        }
    }

    updateReference() {
        if (!this.article.reference) {
            this.article.reference = this.article.description;
        }
    }
}
