import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitapiService } from '../../services/produitapi.service';
import { Produits } from '../../models/produits.interface';


@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  
  produits: Produits[] = [];
  filteredProduits: Produits[] = [];
  selectedGamme: string = 'Tous';
  gammes: string[] = ['Tous', 'Electrique', 'Essence', 'Hybride', 'Diesel'];
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private produitApi: ProduitapiService) { }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.isLoading = true;
    this.hasError = false;
    
    // Call the API to get all products
    this.produitApi.getAllProduits().subscribe({
      // Success callback
      next: (data) => {
        this.produits = data;
        this.filteredProduits = data; // Initially show all products
        this.isLoading = false;
      },
      // Error callback
      error: (error) => {
        this.hasError = true;
        this.errorMessage = 'Erreur lors du chargement des produits';
        this.isLoading = false;
        console.error('Error loading products:', error);
      }
    });
  }


  filterByGamme(gamme: string): void {
    this.selectedGamme = gamme;
    
    if (gamme === 'Tous') {
      this.filteredProduits = this.produits;
    } else {
      this.filteredProduits = this.produits.filter(p => p.gamme === gamme);
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  }
}
