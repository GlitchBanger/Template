import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  getdata(): Observable<Data[]> {
    return this.http.get<Data[]>('http://127.0.0.1:5000/');
  }

  storedata(attacks: number, duration: number, symptoms: string[]): Observable<number> {
    return this.http.post<number>(`http://127.0.0.1:5000/add/${attacks}/${duration}`, { "symptoms": symptoms });
  }
}

export interface Data {
  id: number,
  attacks: number,
  duration: number,
  prediction: number,
  symptoms: string[]
}