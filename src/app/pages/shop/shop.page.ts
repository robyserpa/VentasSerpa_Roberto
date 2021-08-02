import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  producto: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService) { 
      route.queryParams.subscribe(params =>{
        // this.contacto = params.contacto
        if(this.router.getCurrentNavigation().extras.queryParams){
          this.producto = this.router.getCurrentNavigation().extras.queryParams.producto
        }
      })
    }

  ngOnInit() {
  }

  guardar(){
    this.productosService.save(this.producto)
    this.router.navigate(['/compras'])
  }

}
