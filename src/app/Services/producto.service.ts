import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { Product } from '../Model/Producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:7265/api/Product"

  getProductos(){
    return this.http.get(this.url);
  }

  addProducto(product:Product):Observable<Product>{
    return this.http.post<Product>(this.url, product);
  }

  updateProducto(product:Product):Observable<Product>{
    return this.http.put<Product>(this.url, product);
  }

  deleteProducto(id:number){
    return this.http.delete(this.url + `/${id}`);
  }
  

}
