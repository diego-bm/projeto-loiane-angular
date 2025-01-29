import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControlInfoComponent } from './campo-control-info.component';

describe('CampoControlInfoComponent', () => {
  let component: CampoControlInfoComponent;
  let fixture: ComponentFixture<CampoControlInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampoControlInfoComponent]
    });
    fixture = TestBed.createComponent(CampoControlInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
