import { Component } from '@angular/core';
import { Family } from '../cashier-opened/articles-family/family.model';
import { MatDialog } from '@angular/material';
import { ArticlesFamilyService } from '../shared/articles-family.service';

@Component({
    templateUrl: './articles-family.component.html'
})

export class ArticlesFamilyComponent {
    static URL = 'articles-family';

    title = 'Articles Family management';
    columns = ['description'];
    data: Family[];

    constructor(private dialog: MatDialog, private articlesFamilyService: ArticlesFamilyService) {
        this.articlesFamilyService.find('root').subscribe(
            data => this.data = data
        );
    }
}
