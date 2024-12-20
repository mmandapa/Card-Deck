import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDealerComponent } from './card-dealer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('CardDealerComponent', () => {
  let component: CardDealerComponent;
  let fixture: ComponentFixture<CardDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatSliderModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        CardDealerComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a full deck', () => {
    expect(component.deck.length).toBe(52);
    expect(component.dealtCards.length).toBe(0);
  });

  it('should deal the specified number of cards', () => {
    component.cardsToDeal = 5;
    component.dealCards();
    expect(component.dealtCards.length).toBe(5);
    expect(component.deck.length).toBe(47);
  });

  it('should shuffle remaining cards without affecting dealt cards', () => {
    // Deal some cards first
    component.cardsToDeal = 5;
    component.dealCards();
    const dealtCardsSnapshot = [...component.dealtCards];
    const remainingDeckLength = component.deck.length;

    // Shuffle remaining cards
    component.shuffleDeck();

    // Verify dealt cards weren't affected
    expect(component.dealtCards).toEqual(dealtCardsSnapshot);
    expect(component.deck.length).toBe(remainingDeckLength);
  });

  it('should reset the deck to initial state', () => {
    // Deal some cards first
    component.cardsToDeal = 10;
    component.dealCards();
    
    // Reset deck
    component.resetDeck();
    
    expect(component.deck.length).toBe(52);
    expect(component.dealtCards.length).toBe(0);
    expect(component.cardsToDeal).toBe(5);
  });

  it('should validate cards to deal', () => {
    component.cardsToDeal = 60;
    component.validateCardsToDeal();
    expect(component.cardsToDeal).toBe(52);

    component.cardsToDeal = 0;
    component.validateCardsToDeal();
    expect(component.cardsToDeal).toBe(1);
  });
});