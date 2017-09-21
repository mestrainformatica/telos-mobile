import { Prestadores } from '../model/Prestadores';
import { Planos } from '../model/Planos';
import { Produtos } from '../model/Produtos';
import { PortalSaudeService } from '../portal-saude.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-substituicao',
  templateUrl: './substituicao.component.html',
  styleUrls: ['./substituicao.component.css']
})
export class SubstituicaoComponent implements OnInit, OnDestroy {

	substituicaoForm: FormGroup;
	prestadores: Prestadores[];
	planos: Planos[];
	produtos: Produtos[];
	planoSelecionado;
	produtoSelecionado;
	titulo;

  constructor(private portalsaudeService: PortalSaudeService) {

  }

  ngOnInit() {
    console.log(`OnInit sub`);
    this.getPlanos();
  }
  
  ngOnDestroy() { 
  	console.log(`onDestroy sub`);
  	this.produtos = [];
  	this.prestadores = [];
  	console.log(this.prestadores);
  }

  getPlanos(): void {
    this.portalsaudeService.getPlanos()
      .then(planos => this.planos = planos);
  }

  onChange(valor) {
    this.planoSelecionado = valor;
    this.portalsaudeService.getProdutos(valor)
      .then(produtos => this.produtos = produtos);
  }

  onChangeProduto(valor) {
  	this.produtoSelecionado = valor;
  	this.titulo = 'Prestadores Incluidos';
    this.portalsaudeService.pesquisarIncluidos(this.planoSelecionado)
      .then(prestadores => this.prestadores = prestadores);
  }

  getValue(value) {
  	if (this.produtoSelecionado) {
      if (value == '1') {
      	this.titulo = 'Prestadores Incluidos';
         this.portalsaudeService.pesquisarIncluidos(this.planoSelecionado)
          .then(prestadores => this.prestadores = prestadores);
      }
      if (value == '2') {
      	this.titulo = 'Prestadores Excluidos';
        this.portalsaudeService.pesquisarExcluidos(this.planoSelecionado)
          .then(prestadores => this.prestadores = prestadores);
      }
    }

  }

}
