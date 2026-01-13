import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ModelsComponent } from '../../components/models/models.component';
import { InnovationComponent } from '../../components/innovation/innovation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, ModelsComponent, InnovationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // This component acts as a container for the home page sections
}
