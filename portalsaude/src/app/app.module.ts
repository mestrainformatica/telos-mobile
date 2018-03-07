import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { ContatoComponent } from './contato/contato.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { SubstituicaoComponent } from './substituicao/substituicao.component';
import { PortalSaudeService } from './portal-saude.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FaqComponent,
    ContatoComponent,
    ConsultaComponent,
    SubstituicaoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  exports: [
    FileSelectDirective,
    FileDropDirective,
    FormsModule,
    FileUploadModule
  ],
  providers: [PortalSaudeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
