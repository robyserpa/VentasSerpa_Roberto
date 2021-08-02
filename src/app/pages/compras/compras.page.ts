import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/domain/producto';
import { ComprasService } from 'src/app/services/compras.service';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  productos: Observable<Producto[]>;

  constructor(private callNumber: CallNumber,
    private router: Router,
    private comprasService: ComprasService) { }

  ngOnInit() {
    this.productos = this.comprasService.getProductos();
  }

  filterList(evt: any) {
    this.productos = this.comprasService.getProductos();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.productos = this.productos.pipe(
      map(items => 
        items.filter(item => item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1))
    );
  }

  llamar(){
    console.log("llamada")
    this.callNumber.callNumber("0998831305", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
