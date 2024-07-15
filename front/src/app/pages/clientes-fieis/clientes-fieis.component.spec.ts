import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFieisComponent } from './clientes-fieis.component';

describe('ClientesFieisComponent', () => {
  let component: ClientesFieisComponent;
  let fixture: ComponentFixture<ClientesFieisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesFieisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesFieisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
