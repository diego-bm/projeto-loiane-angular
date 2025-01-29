import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControlSuccessComponent } from './campo-control-success.component';

describe('CampoControlSuccessComponent', () => {
  let component: CampoControlSuccessComponent;
  let fixture: ComponentFixture<CampoControlSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampoControlSuccessComponent]
    });
    fixture = TestBed.createComponent(CampoControlSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
