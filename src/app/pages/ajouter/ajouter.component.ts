import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitapiService } from '../../services/produitapi.service';
import { Produits } from '../../models/produits.interface';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.css'
})

export class AjouterComponent {
  productForm: FormGroup;
  gammes: string[] = ['Electrique', 'Essence', 'Hybride', 'Diesel'];
  boites: string[] = ['Automatique', 'Manuelle'];
  showMessage: boolean = false;
  messageType: 'success' | 'error' = 'success';
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private produitApi: ProduitapiService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      modele: ['', [Validators.required, Validators.minLength(3)]],
      puissance: ['', [Validators.required]],
      boite: ['Automatique', [Validators.required]],
      prix: ['', [Validators.required, Validators.min(1)]],
      nprix: ['', [Validators.min(1)]],
      gamme: ['Electrique', [Validators.required]],
      autonomie: [''],
      image: ['', [Validators.required]],
      quantite: [1, [Validators.required, Validators.min(0)]]
    });
  }


  get modele() { return this.productForm.get('modele'); }
  get puissance() { return this.productForm.get('puissance'); }
  get boite() { return this.productForm.get('boite'); }
  get prix() { return this.productForm.get('prix'); }
  get nprix() { return this.productForm.get('nprix'); }
  get gamme() { return this.productForm.get('gamme'); }
  get autonomie() { return this.productForm.get('autonomie'); }
  get image() { return this.productForm.get('image'); }
  get quantite() { return this.productForm.get('quantite'); }

  onSubmit(): void {
    this.showMessage = false;
    
    if (this.productForm.valid) {
      this.isLoading = true;
      
      const formData = this.productForm.value;
      
      const newProduct: Produits = {
        id: Date.now(), 
        modele: formData.modele,
        puissance: formData.puissance,
        boite: formData.boite,
        prix: Number(formData.prix),
        nprix: formData.nprix ? Number(formData.nprix) : undefined,
        gamme: formData.gamme,
        autonomie: formData.autonomie || undefined,
        image: formData.image,
        quantite: Number(formData.quantite)
      };
      
      this.produitApi.addProduit(newProduct).subscribe({
        next: (product) => {
          this.isLoading = false;
          this.showMessage = true;
          this.messageType = 'success';
          this.message = 'Produit ajouté avec succès ! Redirection...';
          
          // Reset the form
          this.productForm.reset({
            boite: 'Automatique',
            gamme: 'Electrique',
            quantite: 1
          });
          
          // Redirect to products page after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/produits']);
          }, 2000);
        },
        // Error callback
        error: (error) => {
          this.isLoading = false;
          this.showMessage = true;
          this.messageType = 'error';
          this.message = 'Une erreur est survenue. Veuillez réessayer.';
          console.error('Add product error:', error);
        }
      });
    } else {
      // Form is invalid - mark all fields as touched to show errors
      this.productForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/produits']);
  }
}
