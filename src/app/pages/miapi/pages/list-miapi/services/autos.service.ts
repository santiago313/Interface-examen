import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auto, autos } from '../interface/autos';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  URL = 'http://localhost:3000/api/autos'
  constructor(private http:HttpClient) { }

  getAllAutos():Observable<autos>{
    return this.http.get<autos>(`${this.URL}`)
  }

  postAuto(newElemento:Auto):Observable<Auto>{
    return this.http.post<Auto>(`${this.URL}`, newElemento)
  }

  putAuto(id:string, newElemento:Auto):Observable<Auto>{
    return this.http.put<Auto>(`${this.URL}/${id}`, newElemento)
  }

  deleteAuto(id:string){
    return this.http.delete(`${this.URL}/${id}`)
  }
}
