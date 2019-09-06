import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Recipe } from './recipe/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  recipes: Recipe[];
  recipeSubscription: Subscription;
  isLoadingSubscription: Subscription;
  isLoading = false;
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
    this.recipeSubscription = this.apiService
      .getRecipeListener()
      .subscribe(recipes => {
        this.recipes = recipes;
        console.log(this.recipes);
      });
    this.recipeSubscription = this.apiService
      .getIsLoadingListener()
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
  }
}
