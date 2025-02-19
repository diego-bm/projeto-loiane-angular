import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { enviroment } from 'src/enviroments/enviroment.development';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  // O set, assim como um array, permite que uma lista de valores sejam
  // armazenados. A diferença é que o set não permite valores duplicados.
  files?: Set<File>;

  constructor(private service: UploadFileService) {}

  ngOnInit(): void {

  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      this.service.upload(this.files, enviroment.BASE_URL + '/upload')
      .subscribe(response => console.log('Upload Concluído'));
      // TODO: Lição de casa: fazer o unsubscribe disso aqui no ngOnDestroy.
    }
  }

  onChange(event: Event) {
    this.files = new Set();
    const selectedFiles = (event.target as HTMLInputElement).files;

    for(let i = 0; i < selectedFiles!.length; i++) {
      this.files.add(selectedFiles!.item(i)!);
    }

    console.log(this.files);
  }
}
