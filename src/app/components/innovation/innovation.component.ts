// src/app/components/innovation/innovation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-innovation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.css'],
})
export class InnovationComponent {
  // Liste des innovations pour les afficher dynamiquement
  features = [
    {
      title: 'Électrification BMW i',
      text: 'Une autonomie record et une recharge rapide. Le futur est électrique.',
      icon: 'bi-lightning-charge-fill',
    },
    {
      title: 'Conduite Autonome',
      text: "Des systèmes d'assistance intelligents pour une sécurité maximale.",
      icon: 'bi-eye-fill',
    },
    {
      title: 'Connectivité 5G',
      text: 'Votre BMW devient une extension de votre smartphone.',
      icon: 'bi-wifi',
    },
  ];
}
