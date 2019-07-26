import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = "https://localhost:5001/api/products";
  private updateUrl: string = "https://localhost:5001/api/products/";

  constructor(private http: HttpClient){}

  getProducts(): Observable<any>{
    return this.http.get(this.url).pipe(
      catchError(this.errorHandler));
  }

  addItem(product: any): Observable<any[]> {
    return this.http.post<any[]>(this.url, product).pipe(
      catchError(this.errorHandler));
  }

  updateItem(product: any): Observable<any[]> {
    return this.http.put<any[]>(this.updateUrl + product.id, product).pipe(
      catchError(this.errorHandler));
  }

  deleteItem(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.updateUrl + id).pipe(
      catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}