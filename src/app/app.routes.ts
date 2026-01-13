import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProduitComponent } from './pages/produit/produit.component';
import { AjouterComponent } from './pages/ajouter/ajouter.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'produits', component: ProduitComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: '**', redirectTo: '/home' }
];
