import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa.models';
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public identidad;
  public token;

  constructor(public _http: HttpClient) { }

  login(empresa, obtenerToken = null): Observable<any> {

    if(obtenerToken != null){
      empresa.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(empresa);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable});
  }

  obtenerToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  obtenerIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }


  obtenerEmpresas(token): Observable<any>{
      let headersToken = this.headersVariable.set('Authorization', token)

      return this._http.get(this.url + '/empresas', { headers: headersToken} )

  }

  agregarEmpresa(modeloEmpresa: Empresa): Observable<any>{
    let parametros = JSON.stringify(modeloEmpresa);

    return this._http.post(this.url + '/agregarEmpresas', parametros, {headers:this.headersVariable})
  }

  obtenerEmpresaId(id : String): Observable<any> {

    return this._http.get(this.url + '/empresas/' + id, { headers: this.headersVariable })
  }


  editarEmpresa(modeloEmpresa: Empresa): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);

    return this._http.put(this.url + '/editarEmpresa/' + modeloEmpresa.id, parametros, {headers: this.headersVariable})
  }

  eliminarEmpresa(id : String): Observable<any> {

    return this._http.delete(this.url + '/eliminarEmpresa/' + id, { headers: this.headersVariable })
  }
}
