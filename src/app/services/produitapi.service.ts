import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produits } from '../models/produits.interface';


@Injectable({
  providedIn: 'root' // This means the service is a singleton (one instance for the whole app)
})
export class ProduitapiService {
  
  // Base URL for our JSON Server API
  private apiUrl = 'http://localhost:3000/produits';

  constructor(private http: HttpClient) { }

  getAllProduits(): Observable<Produits[]> {
    // GET request to http://localhost:3000/produits
    return this.http.get<Produits[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produits> {
    // GET request to http://localhost:3000/produits/1 (for example)
    return this.http.get<Produits>(`${this.apiUrl}/${id}`);
  }


  getProduitsByGamme(gamme: string): Observable<Produits[]> {
    // GET request with query parameter: http://localhost:3000/produits?gamme=Electrique
    return this.http.get<Produits[]>(`${this.apiUrl}?gamme=${gamme}`);
  }


  addProduit(produit: Produits): Observable<Produits> {
    // POST request to http://localhost:3000/produits with the product data
    return this.http.post<Produits>(this.apiUrl, produit);
  }


  updateProduit(id: number, produit: Produits): Observable<Produits> {
    // PUT request to http://localhost:3000/produits/1 (for example)
    return this.http.put<Produits>(`${this.apiUrl}/${id}`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    // DELETE request to http://localhost:3000/produits/1 (for example)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
