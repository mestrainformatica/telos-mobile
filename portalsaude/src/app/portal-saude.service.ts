import { Areas } from './model/Areas';
import { Email } from './model/Email';
import { Consulta } from './model/Consulta';
import { Especialidades } from './model/Especialidades';
import { Localidades } from './model/Localidades';
import { Produtos } from './model/Produtos';
import { Planos } from './model/Planos';
import { Setores } from './model/Setores';
import { Prestadores } from './model/Prestadores';
import { Perguntas } from './model/Perguntas';
import { Credenciados } from './model/Credenciados';
import { Subespecialidades } from './model/Subespecialidades';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PortalSaudeService {

  /* Desenvolvimento local
   * private baseUrl = 'http://localhost:8080';
   * Ambiente do servidor atenção a porta
   * private baseUrl = 'http://192.100.100.126:8585/portalsaude-ws';
   */

  private baseUrl = 'http://192.100.100.126:8585/portalsaude-ws';

  public email: string;
  public assunto: string;
  public messagem: string;

  public numeroPlano: string;

  constructor(private http: Http) { }

    getTodos():  Promise<Perguntas[]> {
        return this.http.get(this.baseUrl + '/api/perguntas/')
          .toPromise()
          .then(response => response.json() as Perguntas[])
          .catch(this.handleError);
    }

    sendEmail(mail: Email): Observable<Email> | any {
      return this.http.post(this.baseUrl + '/api/sendMessage/', mail)
        .map(response => {
          console.log('Sending email was successfull', response);
          return response;
        })
        .catch(error => {
          console.log('Sending email got error', error);
          return Observable.throw(error);
        });
    }

    getPlanos():  Promise<Planos[]> {
        return this.http.get(this.baseUrl + '/api/planos/')
          .toPromise()
          .then(response => response.json() as Planos[])
          .catch(this.handleError);
    }

    getProdutos(valor: string): Promise<Produtos[]> {
        return this.http.get(this.baseUrl + '/api/produtos/' + valor)
          .toPromise()
          .then(response => response.json() as Produtos[])
          .catch(this.handleError);
    }

    getLocalidades(valor: string):  Promise<Localidades[]> {
        return this.http.get(this.baseUrl + '/api/localidades/' + valor)
          .toPromise()
          .then(response => response.json() as Localidades[])
          .catch(this.handleError);
    }

    getAreas():  Promise<Areas[]> {
        return this.http.get(this.baseUrl + '/api/areas/')
          .toPromise()
          .then(response => response.json() as Areas[])
          .catch(this.handleError);
    }

    getEspecialidades(valor: string):  Promise<Especialidades[]> {
        return this.http.get(this.baseUrl + '/api/especialidades/' + valor)
          .toPromise()
          .then(response => response.json() as Especialidades[])
          .catch(this.handleError);
    }

    getSubespecialidades(valor: string):  Promise<Subespecialidades[]> {
        return this.http.get(this.baseUrl + '/api/subespecialidades/' + valor)
          .toPromise()
          .then(response => response.json() as Subespecialidades[])
          .catch(this.handleError);
    }
    
    getSetores():  Promise<Setores[]> {
        return this.http.get(this.baseUrl + '/api/setor/')
          .toPromise()
          .then(response => response.json() as Setores[])
          .catch(this.handleError);
    }

    pesquisarCredenciados(consulta: Consulta): Promise<Credenciados> {
      return this.http.post(this.baseUrl + '/api/buscaCredenciados/', consulta)
          .toPromise()
          .then(response => response.json() as Credenciados[])
          .catch(this.handleError);
    }

    pesquisarIncluidos(valor: string): Promise<Prestadores[]> {
      return this.http.get(this.baseUrl + '/api/searchIncluidos/' + valor)
          .toPromise()
          .then(response => response.json() as Prestadores[])
          .catch(this.handleError);
    }

    pesquisarExcluidos(valor: string): Promise<Prestadores[]> {
      return this.http.get(this.baseUrl + '/api/searchExcluidos/' + valor)
          .toPromise()
          .then(response => response.json() as Prestadores[])
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('Some error occured', error);
      return Promise.reject(error.message || error);
    }

}
