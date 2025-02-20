import { debounceTime, distinctUntilChanged, filter, map, pipe, switchMap, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {
  readonly SEARCH_URL: string = 'https://api.cdnjs.com/libraries'
  readonly FIELDS: string = 'name,description,version,homepage';

  total: number = 0;

  queryField = new FormControl();
  results$!: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      // tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      tap((res: any) => this.total = res.total),
      map((res: any) => {
        return res.results
      })
    );
  }

  onSearch() {
    const fields: string = 'name,description,version,homepage';

    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {

      // Se você tiver todos os parâmetros:
      const params_ = {
        search: value,
        fields: fields
      };

      // Parâmetros dinâmicos:
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      // TODO: Lição de casa: Implementar checkboxes para permitir o
      // usuário escolher quais campos ele gostaria de ver nos
      // resultados.
      //
      // { params } = { params: params } // ES
      this.results$ = this.http.get(this.SEARCH_URL, { params })
        .pipe(
          // Em um projeto real, isso deve ser tipado com uma interface.
          // TODO: Tipar esse res com uma interface.
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results),
        );
    }
  }
}
