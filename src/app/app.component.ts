import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movie: string;
  searchResult: any;
  favorite_movies: any[] = [];
  fav_view: boolean = false;

  constructor(private _movieService: MovieService) { }

  handleSearch() {
    this._movieService.getMovie(this.movie).subscribe(res => {
      this.searchResult = res;
      this.searchResult = this.searchResult.results;
      for(let i = 0;i<this.favorite_movies.length;i++){
        for(let j = 0; j<this.searchResult.length;j++){
          if(this.searchResult[j].id == this.favorite_movies[i].id){
            this.searchResult[j].favorite_flag = true;
          }
        }
      }
    })
    this.movie = '';
  }

  addFavorite(data) {
    let repeat_flag = false;
    data.favorite_flag = !data.favorite_flag;
    if (this.favorite_movies.length == 0) {
      this.favorite_movies.push(data);
    }

    for (let i = 0; i < this.favorite_movies.length; i++) {
      if (this.favorite_movies[i].id == data.id) {
        repeat_flag = true;
        break;
      }
    }
    if (!repeat_flag) {
      this.favorite_movies.push(data);
    }

  }

  removeFavorite(data) {
    data.favorite_flag = !data.favorite_flag;
    let index = this.favorite_movies.indexOf(data);
    this.favorite_movies.splice(index, 1);

  }

}
