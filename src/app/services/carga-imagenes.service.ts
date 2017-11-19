import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FileItem } from '../models/file-items';

import * as firebase from 'firebase';


@Injectable()
export class CargaImagenesService {

  // Carpeta donde se guardaran las imagenes en firebase storage
  private CARPETA_IMAGENES = 'img';

  constructor( public _afd: AngularFireDatabase ) { }

  listaUltimasImagenes ( numeroImagenes: number ): FirebaseListObservable<any[]> {

    // Query para visualizar el numero de imagenes
    return this._afd.list(`/${ this.CARPETA_IMAGENES }`, {
      query: {
        limitToLast: numeroImagenes
      }
    });

  }

  // Carga de imagenes hacia firebase
  cargar_imagenes_firebase ( archivos: FileItem[] ) {
    console.log( archivos );
  }

  // Una vez subida la imagen hay que grabarla en la BD de firebase
  private guardarImagen ( imagen: any) {

    this._afd.list(`/${this.CARPETA_IMAGENES}`).push( imagen );

  }

}
