import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITitle } from '../interfaces/title.interface';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  titles: ITitle[];
  constructor() {
    this.titles = [
      {
        id: 256,
        value: "Mr",
        default: false
      },
      {
        id: 257,
        value: "Mrs",
        default: false
      },
      {
        id: 243,
        value: "Miss",
        default: false
      },
      {
        id: 0,
        value: "!",
        default: false
      },
      {
        id: 598,
        value: "Dr",
        default: true
      },
      {
        id: 87,
        value: "Prof",
        default: false
      },

    ];
   }

  getTitles(): Observable<ITitle[]> {
    return of(this.titles);
  }
}
