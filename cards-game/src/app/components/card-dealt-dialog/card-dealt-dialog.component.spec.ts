import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDealtDialogComponent } from './card-dealt-dialog.component';

describe('CardDealtDialogComponent', () => {
  let component: CardDealtDialogComponent;
  let fixture: ComponentFixture<CardDealtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDealtDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDealtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
