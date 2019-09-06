import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  inputValue = '';
  constructor(private apiService: ApiService) {}
  callAPI() {
    this.apiService.getRecipe(this.inputValue);
  }
}
