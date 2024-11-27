import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Auto } from '../interface/autos';
import { AutosService } from '../services/autos.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal-actualizar',
  standalone: true,
  imports: [],
  templateUrl: './modal-actualizar.component.html',
  styleUrl: './modal-actualizar.component.css'
})
export class ModalActualizarComponent {
  @ViewChild('editModalElement') public editModal!: ElementRef;
  public bootstrapModal: any;
  public selectedAuto: Auto | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private autoService: AutosService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal();
    }
  }

  private initializeModal() {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.editModal.nativeElement);
    });
  }

  public openEditModal(auto: Auto): void {
    this.selectedAuto = auto; // Asigna el auto seleccionado al modal
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  public closeEditModal(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  public Editar(
    id:string,
    marca: string,
    modelo: string,
    fechaCreacion: string,
    precio: string,
    kilometraje: string,
    color: string,
    numeroPuertas: string,
    ubicacion: string,
    descripcion: string
  ): void {
    const updatedAuto: Auto = {
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

    this.autoService.putAuto(id, updatedAuto).subscribe({
      next: (res) => {
        console.log('Auto actualizado:', res);
        this.closeEditModal();
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al actualizar el auto:', err);
      }
    });
  }
}
