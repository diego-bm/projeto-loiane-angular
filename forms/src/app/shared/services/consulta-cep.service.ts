import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private httpClient: HttpClient) { }

  consultaCEP(cep: string){
    cep = cep.replace(/\D/g, '');

    if(cep !== ''){
      const validaCep = /^[0-9]{8}$/;

      if(validaCep.test(cep)){
        return this.httpClient.get(`//viacep.com.br/ws/${cep}/json/`);
      }
    }

    return of({});
  }
}
