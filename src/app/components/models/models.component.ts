import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTANT : Import nécessaire pour *ngFor

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule], // <--- On l'ajoute ici
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css'],
})
export class ModelsComponent {
  cars = [
    // ... (gardez votre liste de voitures ici, ne changez rien aux données)
    {
      name: 'Série 3 Berline',
      price: '45 000 €',
      engine: 'Hybride / Essence',
      image: 'assets/images/serie3-berline.jpg',
      description:
        'La berline sportive par excellence. Dynamique et technologique.',
    },
    {
      name: 'M4 Coupé',
      price: '105 000 €',
      engine: '510 ch Essence',
      image: 'assets/images/bmw-m4.jpg',
      description:
        'Adrénaline pure. Un design audacieux pour des performances extrêmes.',
    },
    {
      name: 'X5 SUV',
      price: '78 000 €',
      engine: 'Diesel / Hybride',
      image: 'assets/images/x5.jpg',
      description: 'Le luxe tout-terrain. Espace, confort et polyvalence.',
    },
  ];

  reserverEssai(modele: string) {
    alert(`Excellent choix ! Vous avez demandé un essai pour la ${modele}.`);
  }
}
