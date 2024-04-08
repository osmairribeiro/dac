
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodosComponent } from './listartodos.component';

describe('ListarTodosComponent', () => {
  let component: ListarTodosComponent;
  let fixture: ComponentFixture<ListarTodosComponent>;

  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ListarTodosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
