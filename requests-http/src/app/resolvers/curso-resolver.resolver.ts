import { ResolveFn } from '@angular/router';
import { CursosService } from '../cursos/cursos.service';
import { inject } from '@angular/core';
import { Curso } from '../cursos/models/curso.model';
import { of } from 'rxjs';

export const cursoResolver: ResolveFn<Curso> = (route, state) => {
  const id: number = <number>(route.paramMap.get('id') ?? 0);

  if(route.params && id) {
    let curso = inject(CursosService).loadByID(id);

    if(curso) {
      return curso;
    }
  }

  return of();
};
