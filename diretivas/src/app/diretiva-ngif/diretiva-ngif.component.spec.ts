import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivaNgifComponent } from './diretiva-ngif.component';

describe('DiretivaNgifComponent', () => {
  let component: DiretivaNgifComponent;
  let fixture: ComponentFixture<DiretivaNgifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretivaNgifComponent]
    });
    fixture = TestBed.createComponent(DiretivaNgifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
