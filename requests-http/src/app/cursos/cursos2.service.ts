import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';

import { Curso } from './models/curso.model';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected override http: HttpClient) {
    super(http, `${enviroment.API}cursos`);
  }
}
