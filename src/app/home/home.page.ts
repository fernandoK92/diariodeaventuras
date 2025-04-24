import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  providers: [Storage],
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>Diario de Aventuras Fernando</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-item>
      <ion-input placeholder="Título" [(ngModel)]="title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-textarea placeholder="Descripción" [(ngModel)]="description"></ion-textarea>
    </ion-item>
    <ion-button expand="full" (click)="saveAdventure()">Guardar</ion-button>

    <ion-list>
      <ion-item *ngFor="let adventure of adventures">
        <ion-label>
          <h2>{{ adventure.title }}</h2>
          <p>{{ adventure.description }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
  `
})
export class HomePage {
  title = '';
  description = '';
  adventures: any[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.loadAdventures();
  }

  async saveAdventure() {
    if (!this.title || !this.description) return;

    const newAdventure = {
      title: this.title,
      description: this.description
    };

    const stored = await this.storage.get('adventures') || [];
    stored.push(newAdventure);
    await this.storage.set('adventures', stored);

    this.title = '';
    this.description = '';
    this.loadAdventures();
  }

  async loadAdventures() {
    this.adventures = await this.storage.get('adventures') || [];
  }
}