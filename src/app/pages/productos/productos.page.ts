import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/domain/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Observable<Producto[]>;

  constructor(private router: Router,
    private productosService: ProductosService) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
  }

  filterList(evt: any) {
    this.productos = this.productosService.getProductos();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.productos = this.productos.pipe(
      map(items => 
        items.filter(item => item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1))
    );
  }

  add(producto: any){
    let params: NavigationExtras = {
      queryParams: {
        producto: producto
      }
    }
    this.router.navigate(['/shop'], params)
  }

}
