import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'app-card-dealer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './card-dealer.component.html',
  styleUrls: ['./card-dealer.component.scss']
})
export class CardDealerComponent implements OnInit {
  deck: Card[] = [];
  dealtCards: Card[] = [];
  cardsToDeal: number = 5;

  private ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  private suits = [
    { name: 'Hearts', symbol: '♥', color: 'red' },
    { name: 'Diamonds', symbol: '♦', color: 'red' },
    { name: 'Clubs', symbol: '♣', color: 'black' },
    { name: 'Spades', symbol: '♠', color: 'black' }
  ];

  ngOnInit() {
    this.initializeDeck();
  }

  initializeDeck() {
    this.deck = [];
    
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.deck.push({
          rank,
          suit: suit.name,
          color: suit.color,
          symbol: suit.symbol
        });
      }
    }
  }

  validateCardsToDeal() {
    if (this.cardsToDeal > this.deck.length) {
      this.cardsToDeal = this.deck.length;
    }
    if (this.cardsToDeal < 1) {
      this.cardsToDeal = 1;
    }
  }

  shuffleDeck() {
    // Fisher-Yates shuffle algorithm for remaining cards only
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCards() {
    this.validateCardsToDeal();
    const newCards = this.deck.splice(0, this.cardsToDeal);
    this.dealtCards = [...this.dealtCards, ...newCards];
  }

  resetDeck() {
    this.dealtCards = [];
    this.initializeDeck();
    this.cardsToDeal = 5;
  }
}