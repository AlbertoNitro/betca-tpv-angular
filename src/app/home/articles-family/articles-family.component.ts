/**
 * Created by Moons on 11/3/2018.
 */
import {Component, OnInit} from '@angular/core';
import {Article} from '../shared/article.model';


@Component({
  selector: 'app-articles-family',
  templateUrl: './articles-family.component.html',
  styleUrls: ['./articles-family.component.css']
})

export class ArticlesFamilyComponent implements OnInit {
  static URL = 'articlesfamily';

  listArt: Article[] = [
    {code: '1', reference: 'a', description: 'a', retailPrice: 1, stock: 1},
    {code: '2', reference: 'b', description: 'b', retailPrice: 2, stock: 2},
    {code: '3', reference: 'c', description: 'c', retailPrice: 3, stock: 3},
    {code: '4', reference: 'd', description: 'd', retailPrice: 1, stock: 1}
  ];


  constructor() {
    console.log(this.listArt);

  }


  ngOnInit() {
  }

}
