import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, /*HttpParams*/ } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from "../utilidades/constantes";

@Injectable({
    providedIn: 'root',
})
export class EmpleadosService {


    constructor(private http: HttpClient) { }

    crearEmpleado(body: any): Observable<any> {
        const url = URL_API;
        return this.http.post<any>(url, body);
    }

    consultarEmpleados(): Observable<any> {
        const url = URL_API;
        return this.http.get(url);
      }


}
