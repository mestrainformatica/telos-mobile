import { Areas } from '../model/Areas';
import { Especialidades } from '../model/Especialidades';
import { Localidades } from '../model/Localidades';
import { Planos } from '../model/Planos';
import { Produtos } from '../model/Produtos';
import { Credenciados } from '../model/Credenciados';
import { Subespecialidades } from '../model/Subespecialidades';
import { PortalSaudeService } from '../portal-saude.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export class Consulta {
  plano: string;
  localidade: string;
  especialidade: string;
  subespecialidade: string;
  nomefantasia: string;
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit, OnDestroy {

  formConsulta: FormGroup;
  planos: Planos[];
  produtos: Produtos[];
  localidades: Localidades[];
  areas: Areas[];
  especialidades: Especialidades[];
  subespecialidades: Subespecialidades[];
  consulta: Consulta;
  credenciados: Credenciados;
  semcredenciados: Credenciados;
  produto;

  constructor(private portalsaudeService: PortalSaudeService) {

  }

  ngOnInit() {
  	console.log(`OnInit cons`);
    this.consulta = {
      plano: '',
      localidade: '',
      especialidade: '',
      subespecialidade: '',
      nomefantasia: ''
    };

    this.getPlanos();

    this.credenciados = {
      razaosocial: '',
      nomefantasia: '',
      cnpj: '',
      endereco: '',
      cep: '',
      ddd: '',
      telefone: '',
      especialidade: '',
      datainicio: ''
    };
    
    this.semcredenciados = {
      razaosocial: '',
      nomefantasia: '',
      cnpj: '',
      endereco: '',
      cep: '',
      ddd: '',
      telefone: '',
      especialidade: '',
      datainicio: ''
    };
  }
  
  ngOnDestroy() { 
  	console.log(`onDestroy cons`);
  	this.credenciados = this.semcredenciados;
  	this.produto = '';
  	this.localidades = [];
  	console.log(this.credenciados);
  }

  getPlanos(): void {
    this.portalsaudeService.getPlanos()
      .then(planos => this.planos = planos);
  }

  onChange(valor) {
    this.portalsaudeService.getProdutos(valor)
      .then(produtos => this.produtos = produtos);

    this.portalsaudeService.getLocalidades(valor)
      .then(localidades => this.localidades = localidades);
  }

  onChangeProduto(valor) {
    this.produto = valor;
  }

  onChangeArea() {
    this.portalsaudeService.getAreas()
      .then(areas => this.areas = areas);
  }

  onChangeEspecialidade(valor) {
    this.portalsaudeService.getEspecialidades(valor)
      .then(especialidades => this.especialidades = especialidades);
  }

  onChangeSubespecialidade(valor) {
    this.portalsaudeService.getSubespecialidades(valor)
      .then(subespecialidades => this.subespecialidades = subespecialidades);
  }

  getConsulta(consulta: Consulta) {
    if (this.produto) {
      this.portalsaudeService.pesquisarCredenciados(consulta)
        .then(credenciados => this.credenciados = credenciados);
    }
  }

}
