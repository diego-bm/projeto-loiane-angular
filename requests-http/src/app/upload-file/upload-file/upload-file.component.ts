import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { enviroment } from 'src/enviroments/enviroment.development';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  progress: number = 0;
  // O set, assim como um array, permite que uma lista de valores sejam
  // armazenados. A diferença é que o set não permite valores duplicados.
  files?: Set<File>;

  constructor(private service: UploadFileService) {}

  ngOnInit(): void {

  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      this.service.upload(this.files, enviroment.BASE_URL + '/upload')
      .pipe(
        uploadProgress(progress => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      )
      // TODO: Lição de casa: fazer o unsubscribe disso aqui no ngOnDestroy.
      .subscribe(response => {
        // TODO: transformar isso num toast/popup (talvez um modal?)
        console.log('Upload Concluído');
      })
      // .subscribe((event: HttpEvent<Object>) => {
      //   // console.log(event)
      //   if(event.type === HttpEventType.Response) {
      //     console.log('Upload Concluído')
      //   } else if(event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round(((event.loaded * 100) / <number>event.total));
      //     // console.log('Progresso', percentDone);
      //     this.progress = percentDone;
      //   }

      // });

    }
  }

  onChange(event: Event) {
    this.files = new Set();
    const selectedFiles = (event.target as HTMLInputElement).files;

    for(let i = 0; i < selectedFiles!.length; i++) {
      this.files.add(selectedFiles!.item(i)!);
    }

    this.progress = 0;
  }

  // Angular não mexe com downloads, é JS puro.
  // É necessário, por conta disso, fazer implementações que lidem com
  // diferentes browsers para que os arquivos possam ser baixados
  // corretamente.
  onDownloadExcel() {
    this.service.download(enviroment.BASE_URL + '/downloadExcel')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.xlsx');
    });
  }

  onDownloadPDF() {
    this.service.download(enviroment.BASE_URL + '/downloadPDF')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.pdf');
    });
  }
}
