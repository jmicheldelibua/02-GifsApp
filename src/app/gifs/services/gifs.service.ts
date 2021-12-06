import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '1j6DpNOb6gNC7tYRS8PwYSNkpQc8Vycp';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  public resultados: Gif[] = [];

get historial(): string[]{
  return [...this._historial];
}

constructor(private http: HttpClient){

  this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
  this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

  // if(localStorage.getItem('historial'))
  // {
  //   this._historial = JSON.parse( localStorage.getItem('historial')! );
  // }
}

buscarGifs( query : string)
{
  query = query.trim().toLocaleLowerCase();

  if(! this._historial.includes(query))
  {
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);
    localStorage.setItem('historial',JSON.stringify(this._historial));
  }
  
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=1j6DpNOb6gNC7tYRS8PwYSNkpQc8Vycp&q=john&limit=5')
    // .then(response =>{
    //     response.json().then( data => console.log(data));
    // })

   const params = new HttpParams()
                      .set('api_key', this.apiKey)
                      .set('limit', '10')
                      .set('q', query);

  // console.log(params.toString());
  // this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=1j6DpNOb6gNC7tYRS8PwYSNkpQc8Vycp&q=${ query }&limit=5`)
  this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`,{ params })
  .subscribe( (resp) => {
    //  console.log(resp.data);
     this.resultados = resp.data;

     localStorage.setItem('resultados', JSON.stringify(resp.data));
  })

}
}
