import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { filter, map, tap } from "rxjs/operators";
import { pipe } from "rxjs";

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((event: HttpEvent<T>) => (event as HttpResponse<T>).body)
  )
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if(event.type === HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / <number>event.total));
    }
  });
}
