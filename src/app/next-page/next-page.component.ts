import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.scss']
})
export class NextPageComponent implements OnInit {
  apiSubscription: Subscription;
  nextShow = false;
  prevShow = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiSubscription = this.apiService
      .getRecipeListener()
      .subscribe(recipeList => {
        console.log(this.apiService.getPage());
        if (this.apiService.getPage() > 1) {
          if (recipeList.length === 0) {
            this.nextShow = false;
          }
          this.prevShow = true;
        } else {
          this.prevShow = false;
          this.nextShow = true;
        }
      });
  }

  nextPage() {
    const name = this.apiService.getName();
    const page = this.apiService.getPage();
    this.apiService.getRecipe(name, page + 1);
  }
  prevPage() {
    const name = this.apiService.getName();
    const page = this.apiService.getPage();
    this.apiService.getRecipe(name, page + -1);
  }
}
