import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { CursosService } from '../cursos/cursos.service';
import { of } from 'rxjs';

export const cursosGuard: CanActivateFn = (route, state) => {
  return true;
};

export const resolve = (route: ActivatedRouteSnapshot) => {
  const id: number = <number>(route.paramMap.get('id') ?? 0);

    if(route.params && id) {
      let curso = inject(CursosService).loadByID(id);

      if(curso) {
        return curso;
      }
    }

    return of();
}
