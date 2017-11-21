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
    this.archivoSobre.emit(true);
  }


}
