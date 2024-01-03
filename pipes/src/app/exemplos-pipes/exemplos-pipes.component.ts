import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent {
  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  };

  livros: string[] = ['Java', 'Angular 2'];

  filtro: string = '';

  addCurso(valor: string){
    this.livros.push(valor);
  }

  obterCursos(){
    if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }

    return this.livros.filter(
      (v) => {
        if (v.toLocaleLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
          return true;
        }
        return false;
      }
    );
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000)
  });

  // A forma de lidar com Observables mudou totalmente comparado ao
  // código da aula
  // Método antigo:
  // valorAsync2 = Observable.interval(2000).map(valor => 'Valor assíncrono 2');

  // Método atual:
  valorAsync2 = new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next('Valor assíncrono 2');
      subscriber.complete();
      subscriber.unsubscribe();
    }, 2000)
  });
}
