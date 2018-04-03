import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ArticlesFamilyService } from '../shared/articles-family.service';
import { Family } from '../cashier-opened/articles-family/family.model';
import { ArticleService } from '../shared/article.service';
import { FamilyType } from '../cashier-opened/articles-family/family-type.model';

@Component({
    templateUrl: 'family-creation-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class FamilyCreationDialogComponent {

    familyTypeKeys = Object.keys(FamilyType);
    family: Family;
    articleIdSynchronized = false;

    constructor(private dialogRef: MatDialogRef<FamilyCreationDialogComponent>,
        private articlesFamilyService: ArticlesFamilyService, private articleService: ArticleService) {

        this.family = { description: undefined };
    }

    findArticle() {
        this.articleService.readObservable(this.family.articleId).subscribe(
            article => this.articleIdSynchronized = true
        );
    }

    deleteArticle() {
        this.family.articleId = undefined;
        this.articleIdSynchronized = false;
    }

    isEmpty(str: string): boolean {
        return (!str || 0 === str.length);
    }

    isValidCreate(): boolean {
        if (!this.family.familyType) {
            return false;
        }
        if (this.family.familyType === FamilyType.ARTICLE) {
            return this.articleIdSynchronized;
        } else {
            return !this.isEmpty(this.family.reference) && !this.isEmpty(this.family.description);
        }
    }

    create() {
        this.articlesFamilyService.create(this.family).subscribe(
            () => this.dialogRef.close()
        );
    }

}
