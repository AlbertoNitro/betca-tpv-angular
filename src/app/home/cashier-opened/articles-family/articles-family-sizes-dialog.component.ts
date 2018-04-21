import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Family } from './family.model';
import { FamilyType } from './family-type.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ArticlesFamilyService } from '../../shared/articles-family.service';

@Component({
    templateUrl: 'articles-family-sizes-dialog.component.html',
    styleUrls: ['articles-family-sizes-dialog.component.css']

})
export class ArticlesFamilySizesDialogComponent {

    title: string;
    families: Family[];

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<ArticlesFamilySizesDialogComponent>,
        private articlesFamilyService: ArticlesFamilyService, private shoppingCartService: ShoppingCartService) {
        this.families = data.families;
        this.title = data.title;
    }

    color(family: Family): string {
        if (family.familyType === FamilyType.ARTICLE && family.stock && family.stock > 0) {
            return 'accent';
        } else {
            return 'basic';
        }
    }

    extractSize(family: Family) {
        return family.reference.substring(family.reference.indexOf('~'));
    }

    add(family) {
        this.articlesFamilyService.findArticle(family.id).subscribe(
            article => this.shoppingCartService.add(article.code).subscribe(
                () => this.dialogRef.close()
            )
        );
    }
}
