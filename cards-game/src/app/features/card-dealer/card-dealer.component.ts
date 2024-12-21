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
import { Firestore, collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../card-game-firebase/firebase';

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
  deckId: string = 'VD9Zpy5UVKN6GNi7d403'; 

  private ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  private suits = [
    { name: 'Hearts', symbol: '♥', color: 'red' },
    { name: 'Diamonds', symbol: '♦', color: 'red' },
    { name: 'Clubs', symbol: '♣', color: 'black' },
    { name: 'Spades', symbol: '♠', color: 'black' }
  ];

  async ngOnInit() {
    await this.loadDeckFromFirebase();
  }

  private async loadDeckFromFirebase() {
    try {
      const deckRef = doc(db, 'deck', this.deckId);
      const deckDoc = await getDoc(deckRef);
      
      if (deckDoc.exists()) {
        const data = deckDoc.data();
        this.dealtCards = data['dealtCards'] || [];
        this.deck = data['remainingCards'] || [];
        
        if (this.deck.length === 0 && this.dealtCards.length === 0) {
          this.initializeDeck();
        }
      } else {
        this.initializeDeck();
        await this.saveDeckToFirebase();
      }
    } catch (error) {
      console.error('Error loading deck:', error);
      this.initializeDeck();
    }
  }

  private async saveDeckToFirebase() {
    try {
      const deckRef = doc(db, 'deck', this.deckId);
      await setDoc(deckRef, {
        dealtCards: this.dealtCards,
        remainingCards: this.deck,
        shuffled: true,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving deck:', error);
    }
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

  async shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    await this.saveDeckToFirebase();
  }

  async dealCards() {
    this.validateCardsToDeal();
    const newCards = this.deck.splice(0, this.cardsToDeal);
    this.dealtCards = [...this.dealtCards, ...newCards];
    await this.saveDeckToFirebase();
  }

  async resetDeck() {
    this.dealtCards = [];
    this.initializeDeck();
    this.cardsToDeal = 5;
    await this.saveDeckToFirebase();
  }
}