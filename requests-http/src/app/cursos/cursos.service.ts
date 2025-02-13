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

  private create(curso: Curso) {
    // Se o curso não tiver id, é um novo registro. Se enviar id como null
    // pro json-server, ele vai salvar o registro com null como seu id.
    // Para impedir isso, passo um objeto sem o atributo id, e deixo o
    // json-server criar o id automaticamente.
    if(!curso.id) {
      let cursoObject = { nome: curso.nome };

      return this.http.post(this.API, cursoObject).pipe(take(1));
    }

    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso: Curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: Curso) {
    if(curso.id) {
      return this.update(curso);
    }

    return this.create(curso);
  }

  remove(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
