import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingModalComponent } from './updating-modal.component';

describe('UpdatingModalComponent', () => {
  let component: UpdatingModalComponent;
  let fixture: ComponentFixture<UpdatingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
