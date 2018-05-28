import {Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';

import {Family} from '../cashier-opened/articles-family/family.model';
import {FamilyType} from '../cashier-opened/articles-family/family-type.model';
import {ArticlesFamilyService} from '../shared/articles-family.service';
import {FamilyAdditionDialogComponent} from './family-addition-dialog.component';
import {FamilyCreationDialogComponent} from './family-creation-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

@Component({
  templateUrl: 'articles-family.component.html'
})

export class ArticlesFamilyComponent {
  static URL = 'articles-family';

  title = 'Articles Family management';
  columns = ['description'];
  data: Family[];

  breadcrumbs: string;

  family: Family;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private articlesFamilyService: ArticlesFamilyService) {
    this.root();
    this.synchronize();
  }

  root() {
    this.breadcrumbs = '';
    this.family = {id: 'root', description: 'Root'};
    this.synchronize();
  }

  synchronize() {
    this.articlesFamilyService.findList(this.family.id).subscribe(
      data => this.data = data
    );
  }

  add() {
    this.dialog.open(FamilyAdditionDialogComponent,
      {
        width: '600px',
        data: {familyId: this.family.id}
      }
    ).afterClosed().subscribe(
      () => this.synchronize()
    );
  }

  delete(family: Family) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.articlesFamilyService.delete(this.family.id, family.id).subscribe(
            () => this.synchronize()
          );
        }
      }
    );
  }

  read(family: Family) {
    if (family.familyType === FamilyType.ARTICLE) {
      this.snackBar.open('Ineffective operation', 'Error', {
        duration: 3000
      });
    } else {
      this.family = family;
      this.breadcrumbs += ' > ' + family.reference;
      this.synchronize();
    }
  }

  edit(family: Family) {
    this.dialog.open(FamilyCreationDialogComponent, {
      data: {
        editable: true,
        family: family
      }
    }).afterClosed().subscribe(
      () => this.synchronize()
    );
  }
}
