import { Component } from '@angular/core';
import { Family } from '../cashier-opened/articles-family/family.model';
import { MatDialog } from '@angular/material';
import { ArticlesFamilyService } from '../shared/articles-family.service';
import { FamilyAdditionDialogComponent } from './family-addition-dialog.component';

@Component({
    templateUrl: './articles-family.component.html'
})

export class ArticlesFamilyComponent {
    static URL = 'articles-family';

    title = 'Articles Family management';
    columns = ['description'];
    data: Family[];

    familyId = 'root';

    constructor(private dialog: MatDialog, private articlesFamilyService: ArticlesFamilyService) {
        this.synchronize();
    }

    synchronize() {
        this.articlesFamilyService.findList(this.familyId).subscribe(
            data => this.data = data
        );
    }

    add() {
        this.dialog.open(FamilyAdditionDialogComponent,
            {
                data: { familyId: this.familyId }
            }
        ).afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    delete(family: Family) {
        this.articlesFamilyService.delete(this.familyId, family.id).subscribe(
            () => this.synchronize()
        );
    }
}
