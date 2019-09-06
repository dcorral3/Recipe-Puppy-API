import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  ingredientsArray: string[];
  constructor() {}
  ngOnInit() {
    this.ingredientsArray = this.recipe.ingredients.trim().split(',');
  }
  onNavigate() {
    window.open(this.recipe.href, '_blank');
  }
}
