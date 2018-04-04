import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Family } from './family.model';
import { FamilyType } from './family-type.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
    templateUrl: './articles-family-sizes-dialog.component.html',
    styleUrls: ['./articles-family-sizes-dialog.component.css']

})
export class ArticlesFamilySizesDialogComponent {

    families: Family[];

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<ArticlesFamilySizesDialogComponent>,
        private shoppingCartService: ShoppingCartService) {
        this.families = data.families;
    }

    color(family: Family): string {
        if (family.familyType === FamilyType.ARTICLE && family.stock && family.stock > 0) {
            return 'accent';
        } else {
            return 'basic';
        }
    }

    add(family) {
        if (family.composite === FamilyType.ARTICLE) {
            this.shoppingCartService.add(family.id).subscribe(
                () => this.dialogRef.close()
            );
        }
    }
}
