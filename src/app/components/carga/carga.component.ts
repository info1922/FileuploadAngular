import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';



@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  // Variables de control de carga
  estaSobreDropZone = false;
  // Permite habilitar el boton de cargar
  permiteCargar = true;
  archivos: FileItem[] = [];

  constructor( public _cis: CargaImagenesService) { }

  ngOnInit() {
  }

  archivoSobreDropZone(e: boolean) {
    console.log(e);
    this.estaSobreDropZone = e;

  }

  cargarImagenesFirebase () {
    this.permiteCargar = false;
    this._cis.cargar_imagenes_firebase( this.archivos );
  }

  limpiarArchivos () {
    this.archivos = [];
    this.permiteCargar = true;
  }

}
