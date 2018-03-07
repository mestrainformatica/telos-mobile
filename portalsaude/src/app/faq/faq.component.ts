import { Perguntas } from '../model/Perguntas';
import { PortalSaudeService } from '../portal-saude.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  perguntas: Perguntas[];

  constructor(private portalsaudeService: PortalSaudeService) {

  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.portalsaudeService.getTodos()
      .then(perguntas => this.perguntas = perguntas );
  }

}
