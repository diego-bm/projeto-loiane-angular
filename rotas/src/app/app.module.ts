// Aula 57: se ainda fosse possível fazer o roteamento da forma que a
// Loiane inicialmente mostrou, eu teria que remover o "routing"
// daqui. Como eu inicialmente já fiz do jeito moderno, isso não foi
// necessário.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule  } from '@angular/material/icon';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosService } from './cursos/cursos.service';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CursosComponent,
    CursoDetalheComponent,
    CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    // Aula 57: eu teria que ter importado esse cara aqui nessa aula
    // se o método antigo mostrado pela Loiane ainda fosse possível
    // de ser utilizado.
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    FormsModule
  ],
  providers: [CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
