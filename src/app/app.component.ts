import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Recipe } from './recipe/recipe.model';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ) // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px'
          })
        )
      ])
    ]),
    trigger('list', [
      transition(':enter', [query('@items', stagger(300, animateChild()))])
    ])
  ]
})
export class AppComponent implements OnInit {
  recipes: Recipe[];
  recipeSubscription: Subscription;
  isLoadingSubscription: Subscription;
  isLoading = false;
  page = 0;
  tmpRecipe: Recipe = {
    href: 'http://www.recipezaar.com/Baked-Omelet-With-Broccoli-Tomato-325014',
    ingredients:
      'milk, cottage cheese, broccoli, cheddar cheese, basil, onion powder, eggs, garlic powder, roma tomato, salt',
    thumbnail: 'http://img.recipepuppy.com/123889.jpg',
    title: 'Baked Omelet With Broccoli & Tomato'
  };
  constructor(private apiService: ApiService) {
    this.recipes = [];
  }
  ngOnInit() {
    window.scroll(0, 0);
    this.recipeSubscription = this.apiService
      .getRecipeListener()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.page = this.apiService.getPage();
        console.log(this.recipes);
      });
    this.recipeSubscription = this.apiService
      .getIsLoadingListener()
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
  }
}
