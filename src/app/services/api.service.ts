import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private recipeListener = new Subject<any[]>();
  url = 'http://www.recipepuppy.com/api/?q=';
  private isLoadingListener = new Subject<boolean>();
  page = 1;
  name = '';
  constructor(private http: HttpClient) {}

  getRecipeListener() {
    return this.recipeListener.asObservable();
  }

  getIsLoadingListener() {
    return this.isLoadingListener.asObservable();
  }

  getPage() {
    return this.page;
  }

  getName() {
    return this.name;
  }
  // API CALLS
  getRecipe(name, page) {
    window.scroll(0, 0);
    this.isLoadingListener.next(true);
    this.page = page;
    this.name = name;
    const urlAux = `http://www.recipepuppy.com/api/?q=${this.name}&p=${this.page}`;
    console.log(urlAux);
    this.http.get<any>(urlAux).subscribe(
      res => {
        console.log(res);
        this.isLoadingListener.next(false);
        this.recipeListener.next(res.results);
      },
      error => {
        console.log(error);
      }
    );
  }
}
