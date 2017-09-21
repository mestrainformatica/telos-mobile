import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstituicaoComponent } from './substituicao.component';

describe('SubstituicaoComponent', () => {
  let component: SubstituicaoComponent;
  let fixture: ComponentFixture<SubstituicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstituicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
