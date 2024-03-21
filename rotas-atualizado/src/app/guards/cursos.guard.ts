import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CursosGuard {
    canActivateChild() : Observable<boolean> | Promise<boolean> | boolean {
        console.log('guarda de rota filha');

        return true;
      }
}