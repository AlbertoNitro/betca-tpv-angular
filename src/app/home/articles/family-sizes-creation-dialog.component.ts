import {Component} from '@angular/core';
import {ArticlesFamilyService} from '../shared/articles-family.service';

@Component({
  templateUrl: 'family-sizes-creation-dialog.component.html',
  styleUrls: ['articles.component.css']
})
export class FamilySizesCreationDialogComponent {
  constructor(private articlesFamilyService: ArticlesFamilyService) {
  }

  create(files: FileList) {
    this.articlesFamilyService.createFamilySizes(files.item(0));
  }

}
