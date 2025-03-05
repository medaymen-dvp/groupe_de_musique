import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalleComponent } from './edit-salle.component';

describe('EditSalleComponent', () => {
  let component: EditSalleComponent;
  let fixture: ComponentFixture<EditSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
