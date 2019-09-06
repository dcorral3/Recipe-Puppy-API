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
  }
}
