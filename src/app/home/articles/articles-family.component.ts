import { Component } from '@angular/core';
import { Family } from '../cashier-opened/articles-family/family.model';
import { MatDialog } from '@angular/material';
import { ArticlesFamilyService } from '../shared/articles-family.service';
import { FamilyAdditionDialogComponent } from './family-addition-dialog.component';
import { FamilyCreationDialogComponent } from './family-creation-dialog.component';

@Component({
    templateUrl: './articles-family.component.html'
})

export class ArticlesFamilyComponent {
    static URL = 'articles-family';

    title = 'Articles Family management';
    columns = ['description'];
    data: Family[];

    breadcrumbs: string;

    family: Family;

    constructor(private dialog: MatDialog, private articlesFamilyService: ArticlesFamilyService) {
        this.root();
        this.synchronize();
    }

    root() {
        this.breadcrumbs = '';
        this.family = { id: 'root', description: 'Root' };
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
                width: '500px',
                data: { familyId: this.family.id }
            }
        ).afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    delete(family: Family) {
        this.articlesFamilyService.delete(this.family.id, family.id).subscribe(
            () => this.synchronize()
        );
    }

    read(family: Family) {
        this.family = family;
        this.breadcrumbs += ' > ' + family.reference;
        this.synchronize();
    }

    edit(family: Family) {
        this.dialog.open(FamilyCreationDialogComponent, {
            data: {
                edit: true,
                family: family
            }
        }).afterClosed().subscribe(
            result => this.synchronize()
        );
    }
}
