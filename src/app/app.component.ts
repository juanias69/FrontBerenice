import { Component } from '@angular/core';
import { Product } from './Model/Producto';
import { ProductoService } from './Services/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  producto:Product = new Product();
  datatable:any = [];

  constructor(private productoService:ProductoService){

  }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.productoService.getProductos().subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  onAddProducto(product:Product):void{
    if (product.product_id > 0 && product.product != "" && product.description != "" 
        && product.stock > -1 && product.price > 0 && product.active > 0)
        {
          this.productoService.addProducto(product).subscribe(res => {
            if(res){
              alert(`El producto ${product.product} se ha registrado con exito!`);
              this.clear();
              this.onDataTable();
            } else {
              alert('Error! :(')
            }
          });
        }else {
          alert(`Todos los campos son requeridos, por favor verifique!`);
        }

  }

  onUpdateProducto(product:Product):void{
    if (product.id > 0){
      this.productoService.updateProducto(product).subscribe(res => {
        console.log(res);
        if(res){
          alert(`El producto ${product.id} se ha modificado con exito!`);
          this.clear();
          this.onDataTable();
        } else {
          alert('Error! :(')
        }
      });
    }else{
      alert(`Debe seleccionar un registro para editar!`);
    }
    
  }

  onDeleteProducto(id:number):void{

    if (id > 0)
    {
      this.productoService.deleteProducto(id).subscribe(res => {
        if(res){
          alert(`El producto numero ${id} se ha eliminado con exito!`);
          this.clear();
          this.onDataTable();
        } else {
          alert('Error! :(')
        }
      });

    }else{
      alert(`Debe seleccionar un registro para eliminar!`);
    }
  }

  onSetData(select:any){
    this.producto.id = select.id;
    this.producto.product = select.product;
    this.producto.description = select.description;
    this.producto.stock = select.stock;
    this.producto.price = select.price;
    this.producto.type = select.type;
    this.producto.active = select.active;
  }

  clear(){
    this.producto.id = 0;
    this.producto.product = "";
    this.producto.description = "";
    this.producto.stock = 0;
    this.producto.price = 0;
    this.producto.type = "";
    this.producto.active = 0;
  }
}
