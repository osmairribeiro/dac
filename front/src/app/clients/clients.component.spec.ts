<<<<<<<< HEAD:front/src/app/gerente/home/gerente.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteComponent } from './gerente.component';

describe('GerenteComponent', () => {
  let component: GerenteComponent;
  let fixture: ComponentFixture<GerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
========
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>>> ff91764b54c48e4c57a7cd3ab4abc5c547bac29c:front/src/app/clients/clients.component.spec.ts
