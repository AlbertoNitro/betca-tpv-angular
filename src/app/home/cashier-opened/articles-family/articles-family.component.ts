/**
 * Created by Moons on 11/3/2018.
 */
import {Component, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';


@Component({
  selector: 'app-articles-family',
  templateUrl: './articles-family.component.html',
  styleUrls: ['./articles-family.component.css']
})

export class ArticlesFamilyComponent implements OnInit {
  static URL = 'articlesfamily';
  positionabove = 'above';
  positionleft = 'left';
  imagePathArticle = '../../../assets/img/articles/a4azul.jpg';
  imagePathFamily = '../../../assets/img/articles/art-azul.jpg';

  listArt: Article[] = [
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28},
    {code: '311', reference: 'Article13', description: 'Article13 The titles of Washed', retailPrice: 37, stock: 39},
    {code: '411', reference: 'Article14', description: 'Article14 The titles of Washed', retailPrice: 51, stock: 16},
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28},
    {code: '311', reference: 'Article13', description: 'Article13 The titles of Washed', retailPrice: 37, stock: 39},
    {code: '411', reference: 'Article14', description: 'Article14 The titles of Washed', retailPrice: 51, stock: 16},
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28},
    {code: '311', reference: 'Article13', description: 'Article13 The titles of Washed', retailPrice: 37, stock: 39},
    {code: '411', reference: 'Article14', description: 'Article14 The titles of Washed', retailPrice: 51, stock: 16},
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28},
    {code: '311', reference: 'Article13', description: 'Article13 The titles of Washed', retailPrice: 37, stock: 39},
    {code: '411', reference: 'Article14', description: 'Article14 The titles of Washed', retailPrice: 51, stock: 16},
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28},
    {code: '311', reference: 'Article13', description: 'Article13 The titles of Washed', retailPrice: 37, stock: 39},
    {code: '411', reference: 'Article14', description: 'Article14 The titles of Washed', retailPrice: 51, stock: 16},
    {code: '111', reference: 'Article11', description: 'Article11 The titles of Washed', retailPrice: 81, stock: 156},
    {code: '211', reference: 'Article12', description: 'Article12 The titles of Washed', retailPrice: 26, stock: 28},
    {code: '311', reference: 'Article13', description: 'Article13 The titles of Washed', retailPrice: 37, stock: 39},
    {code: '411', reference: 'Article14', description: 'Article14 The titles of Washed', retailPrice: 51, stock: 16},


  ];


  constructor() {
    console.log(this.listArt);

  }


  ngOnInit() {
  }

}
