import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoBr } from '../models/estado-br.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  // Código assistido por IA
  getEstadosBr(): Observable<EstadoBr[]> {
    return this.httpClient.get<EstadoBr[]>('assets/dados/estadosbr.json');
  };
}
