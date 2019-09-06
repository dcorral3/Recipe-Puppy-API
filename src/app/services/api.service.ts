import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private recipeListener = new Subject<any[]>();
  url = 'http://www.recipepuppy.com/api/?q=';
  private isLoadingListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getRecipeListener() {
    return this.recipeListener.asObservable();
  }

  getIsLoadingListener() {
    return this.isLoadingListener.asObservable();
  }

  // API CALLS
  getRecipe(name) {
    this.isLoadingListener.next(true);
    console.log(name);
    const urlAux = this.url + name;
    console.log(urlAux);
    this.http.get<any>(urlAux).subscribe(
      res => {
        this.isLoadingListener.next(false);
        this.recipeListener.next(res.results);
      },
      error => {
        console.log(error);
      }
    );
  }
}
