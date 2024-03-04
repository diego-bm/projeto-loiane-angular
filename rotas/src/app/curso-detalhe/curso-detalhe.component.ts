import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.scss']
})
export class CursoDetalheComponent {

  id: string = '';

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];

    console.log(route);
    
  }

}
