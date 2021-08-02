import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore} from '@angular/fire/firestore'
import { Producto } from '../domain/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(public afs: AngularFirestore) { }
  
  getProductos(): Observable<any[]>{
    return this.afs.collection("productos",
          ref => ref.where("active","==",true)).valueChanges();
  }

  save(producto: Producto){

    const refProductos = this.afs.collection("compras");
    // if(producto.uid == null){
    //   producto.uid = this.afs.createId();
    //   producto.active = true
    // }

    refProductos.doc(producto.uid).set(Object.assign({}, producto))
    
  }
}
