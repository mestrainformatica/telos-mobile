import { Component, OnInit } from '@angular/core';
import { PortalSaudeService } from '../portal-saude.service';
import { FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Setores } from '../model/Setores';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Email {
  matricula: string;
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  setor: string;
}

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  	mail: Email;
  	setores: Setores[];
  
	file: FileList;
	upload : () => void;

  constructor(private portalsaudeService: PortalSaudeService, private http: Http) {

  }

  ngOnInit() {
  	this.getSetores();
  
    this.mail = {
      matricula: '',
      nome: '',
      email: '',
      assunto: '',
      mensagem: '',
      setor: ''
    };
    
  }
  
	getSetores(): void {
	    this.portalsaudeService.getSetores()
	      .then(setores => this.setores = setores);
	}
  
	selectFile(event): void {
		this.file = event.target.files;
	}
	
	sendEmail(mail: Email) {
	  	if (null != this.mail.nome && null != this.mail.email && null != this.mail.assunto && null != this.mail.setor && null != this.mail.mensagem) {
	  		let formData:FormData = new FormData();
	  		if (null != this.mail.matricula){
	  			formData.append("matricula", this.mail.matricula);
	  		}	  		
	  		formData.append("nome", this.mail.nome);
	  		formData.append("email", this.mail.email);
	  		formData.append("assunto", this.mail.assunto);
	  		formData.append("setor", this.mail.setor);
	  		formData.append("mensagem", this.mail.mensagem);
	  		
	  		if (this.file) {
		  		if (this.file.length) {
			    	let fileList = this.file;
			    	let fileListLength = fileList.length;
			    
				    if (fileListLength > 0) {
				        for (var i = 0; i < fileListLength; i++) {
				            formData.append("file", fileList[i]);
				        }			            
				    }
		  		}
		  	}
			
			let xhr = new XMLHttpRequest();
		    xhr.open("POST", 'http://192.100.100.126:8585/portalsaude-ws/api/sendMessage');
		    xhr.send(formData);
		    xhr.onreadystatechange = function() {
		    	if (xhr.readyState == 4 && this.status == 200) {
		    		alert('E-mail enviado com sucesso!');		    
		    	}
		    }
		}
	}

}
