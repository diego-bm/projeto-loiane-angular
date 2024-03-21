import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AlunosGuard {
    canActivateChild() : Observable<boolean> | boolean {
        return true;
      }
}