import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReclamoComponent } from './modificar-reclamo.component';

describe('ModificarReclamoComponent', () => {
  let component: ModificarReclamoComponent;
  let fixture: ComponentFixture<ModificarReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
