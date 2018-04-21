import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { Family } from '../cashier-opened/articles-family/family.model';
import { FamilyType } from '../cashier-opened/articles-family/family-type.model';
import { ArticlesFamilyService } from '../shared/articles-family.service';
import { FamilyCreationDialogComponent } from './family-creation-dialog.component';

@Component({
    templateUrl: 'family-addition-dialog.component.html',
    styleUrls: ['articles.component.css']
})
export class FamilyAdditionDialogComponent {

    families: Family[];
    familyId: string;
    childId: string;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<FamilyAdditionDialogComponent>,
        private dialog: MatDialog, private articlesFamilyService: ArticlesFamilyService) {

        this.familyId = data.familyId;
        this.synchronized();
    }

    synchronized() {
        this.articlesFamilyService.findAll().subscribe(
            families => this.families = families
        );
    }

    delete(type: string) {
        const familyType = FamilyType[type];
        this.families = this.families.filter(item => item.familyType !== familyType);
    }

    add() {
        this.articlesFamilyService.add(this.familyId, this.childId).subscribe(
            () => this.dialogRef.close()
        );
        console.log(this.childId);
    }

    create() {
        this.dialog.open(FamilyCreationDialogComponent).afterClosed().subscribe(
            result => this.synchronized()
        );
    }
}
