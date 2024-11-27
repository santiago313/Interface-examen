import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { AutosService } from '../services/autos.service';
import { isPlatformBrowser } from '@angular/common';
import { Auto } from '../interface/autos';

@Component({
  selector: 'app-modal-principal',
  standalone: true,
  imports: [],
  templateUrl: './modal-principal.component.html',
  styleUrl: './modal-principal.component.css'
})
export class ModalPrincipalComponent {
  private bootstrapModal: any;
  @ViewChild('modalElement') public modal!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private _srvAuto: AutosService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarModal();
    }
  }

  inicializarModal() {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId) && this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
  }

  Agregar(
    marca: string,
    modelo: string,
    fechaCreacion: string,
    precio: string,
    kilometraje: string,
    color: string,
    numeroPuertas: string,
    ubicacion: string,
    descripcion: string
  ) {
    const nuevoAuto: Auto = {
      marca,
      modelo,
      fechaCreacion: Number(fechaCreacion),
      precio: Number(precio),
      kilometraje: Number(kilometraje),
      color,
      numeroPuertas: Number(numeroPuertas),
      ubicacion,
      descripcion,
    };

    this._srvAuto.postAuto(nuevoAuto).subscribe({
      next: () => {
        console.log('Auto agregado correctamente');
        this.closeModal();
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al agregar el auto:', err);
      },
    });
  }
}
