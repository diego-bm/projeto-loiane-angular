import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from './models/curso.model';
import { delay, take, tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${enviroment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadByID(id: number) {
    if(id) {
      return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
    } else {
      return null;
    }
  }

  create(curso: Curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

}
