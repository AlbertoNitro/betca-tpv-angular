import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {Family} from '../cashier-opened/articles-family/family.model';
import {FamilyType} from '../cashier-opened/articles-family/family-type.model';
import {ArticlesFamilyService} from '../shared/articles-family.service';
import {ArticleService} from '../shared/article.service';

@Component({
  templateUrl: 'family-creation-dialog.component.html',
  styleUrls: ['articles.component.css']
})
export class FamilyCreationDialogComponent {

  familyTypeKeys = Object.keys(FamilyType);
  family: Family;
  articleIdSynchronized = false;
  editable: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<FamilyCreationDialogComponent>,
              private articlesFamilyService: ArticlesFamilyService, private articleService: ArticleService) {

    this.family = {description: undefined};
    this.editable = false;
    if (data) {
      if (data.edit) {
        this.editable = data.edit;
      }
      if (data.family) {
        this.family = data.family;
        if (data.family.familyType === FamilyType.ARTICLE) {
          this.articlesFamilyService.findArticle(data.family.id).subscribe(
            article => this.family.articleId = article.code
          );
        }
      }
    }
  }

  findArticle() {
    this.articleService.readOne(this.family.articleId).subscribe(
      () => this.articleIdSynchronized = true
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

  save() {
    this.articlesFamilyService.update(this.family).subscribe(
      () => this.dialogRef.close()
    );
  }

}
