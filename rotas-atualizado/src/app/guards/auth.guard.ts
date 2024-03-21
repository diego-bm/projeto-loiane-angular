import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
  //   console.log('canLoad: verificando se o usuário pode carregar o código do módulo');

  //   return this.verificarAcesso();
  // }

  canMatch(): boolean | Observable<boolean> | Promise<boolean> {
    return this.verificarAcesso();
  }

  canActivate() : Observable<boolean> | boolean {
    return this.verificarAcesso();
  }

  private verificarAcesso() {
    if(this.authService.usuarioEstaAutenticado()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
