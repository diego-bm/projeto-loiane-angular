import { 
  Component,
  ViewChild
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rotas';
  @ViewChild(MatSidenav)
  // O exclamação é chamado de assert, ele basicamente assegura o transpilador
  // de que você tem certeza que essa variável não será nula ou indefinida.
  // A "assertividade" do nome vem do desenvolvedor, então eu imagino que isso
  // deva ser utilizado com cuidado.
  sidenav!: MatSidenav;
  isMobile: boolean = true;
  isCollapsed: boolean = true;
  idCurso: number = 0;
  mostrarMenu: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe(
      (mostrar: boolean) => this.mostrarMenu = mostrar
    );

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  protected toggleMenu() {
    if(this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // O menu nunca deve ser colapsado em mobile
    } else {
      this.sidenav.open(); // Em desktops e tablets, o menu nunca deve ser totalmente fechado
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
