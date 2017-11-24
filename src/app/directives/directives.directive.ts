// EventEmitter => emite un evento personalizado en algun componente
// ElementRef => referencia al elemento adjunto a la directiva
// HostListener => Para adjuntar eventos drag..
// Input => Para recibir informacion que biene del padre
// Output => Para mandarle informacion al padre
import { Directive, EventEmitter, ElementRef, HostListener,
          Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';

@Directive({
  selector: '[appNgDropFiles]'
})
export class DirectivesDirective {

 // Relacion entre el padre y el hijo con los archivos
  @Input() archivos: FileItem[] = [];
 // Emitimos un evento al posicionar los archivos en la dropzone
  @Output() archivoSobre: EventEmitter<any> = new EventEmitter();

  constructor( public elemento: ElementRef ) { }

  // Cuando el cursor entra
  @HostListener('dragenter', ['$event'])
  public onDragEnter( event: any ) {
    this.archivoSobre.emit(true);
  }

  // Cuando el cursor sale
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.archivoSobre.emit(false);
  }

  // Cuado el cursor entra y sale
  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {

    const tranferencia = this._getTransferencia(event);
    tranferencia.dropEffect = 'copy';
    this._prevenirYdetener(event);

    this.archivoSobre.emit(true);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const tranferencia = this._getTransferencia(event);

    if (!tranferencia) {
      return;
    }
    this._agregarArchivos( tranferencia.files );

    this.archivoSobre.emit(false);

    this._prevenirYdetener( event );

  }

  // Valida si hay algo que transferir
  private _getTransferencia ( event: any) {
    // console.log(event);
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos ( archivosLista: FileList ) {
    // console.log(archivosLista);

    // tslint:disable-next-line:forin
    for ( let propiedad in Object.getOwnPropertyNames( archivosLista )) {
      // tslint:disable-next-line:prefer-const
      let archTemporal = archivosLista[propiedad];

      if ( this._archivoPuedeSerCargado(archTemporal) ) {

        // tslint:disable-next-line:prefer-const
        let nuevoArchivo = new FileItem( archTemporal );

        this.archivos.push(nuevoArchivo);

      }
    }
    console.log(this.archivos);
  }

  // Previene el comportamiento por defecto
  private _prevenirYdetener (event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoPuedeSerCargado ( archivo: File ) {

    if ( this._archivoYaFueDroppeado( archivo.name) && this._esImagen(archivo.type) ) {

      return true;

    }

    return false;

  }

  private _archivoYaFueDroppeado (nombreArchivo: string): boolean {
    // tslint:disable-next-line:forin
    for ( const i in this.archivos ) {
      const arch = this.archivos[i];

      if (arch.archivo.name === nombreArchivo) {
        console.log('Archivo ya existe en la lista', nombreArchivo);
        return true;
      }
    }

    return false;
  }

  // Validar el archivo

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined ) ? false: tipoArchivo.startsWith('image');
  }


}
