import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class MovieService {
  
  ROOT_URL:string = 'https://api.themoviedb.org/3/search/movie?api_key=3d34e72c9badeb4e4254c09ec0109d8e&language=en-US&query=';
  constructor(private _http:HttpClient) { }
  getMovie(movie){
     return this._http.get(this.ROOT_URL+movie+'&page=1&include_adult=false');
  }

}
