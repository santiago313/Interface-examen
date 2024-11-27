import { Component, Input, input, ViewChild } from '@angular/core';
import { Auto, autos } from '../interface/autos';
import { NgFor } from '@angular/common';
import { AutosService } from '../services/autos.service';
import { ModalPrincipalComponent } from '../modal-principal/modal-principal.component';
import { ModalActualizarComponent } from '../modal-actualizar/modal-actualizar.component';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [NgFor, ModalPrincipalComponent, ModalActualizarComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Input() autosAll:autos | undefined

  @ViewChild(ModalPrincipalComponent) public modal!: ModalPrincipalComponent
  @ViewChild(ModalActualizarComponent) public modalEdit!: ModalActualizarComponent

  constructor(private _srvAutos:AutosService){}

  eliminarElemento(id:string){
    this._srvAutos.deleteAuto(id).subscribe({
      next: next => {
        this._srvAutos.getAllAutos().subscribe(autos => {
          this.autosAll = autos
        })
      }
    })
  }

  openModal(){
    if(this.modal){
      this.modal.open();
    }
  }

  openEdit(auto:Auto){
    if(this.modalEdit){
      this.modalEdit.openEditModal(auto)
    }
  }
}
