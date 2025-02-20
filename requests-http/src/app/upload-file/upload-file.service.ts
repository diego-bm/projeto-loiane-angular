import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file, file.name);
    });

    // o método post do Angular abstrai esse processo abaixo.
    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'// ,
      // reportProgress
      // O back-end precisa setar o content-length no header, para que
      // seja possível acompanhar o progresso do download.
      // "O Angular não tem bola de cristal."
      // -
      // content-length
    });
  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res], {
      type: res.type
    });

    // IE
    if(window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(file);
      return;
    }

    // Chrome
    // Gambiarra para fazer o download do arquivo.
    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // A Loiane disse que esse click() não funciona nas versões
    // mais recentes do Firefox, mas funcionou normalmente em minha
    // máquina após um rápido teste.
    // link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }))

    // De acordo com a Loiane, esse delay é necessário para que o
    // Firefox remova corretamente o link. Não tive como testar.
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
