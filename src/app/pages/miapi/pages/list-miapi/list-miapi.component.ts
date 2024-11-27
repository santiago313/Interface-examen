import { Component, OnInit } from '@angular/core';
import { autos } from './interface/autos';
import { AutosService } from './services/autos.service';
import { ListaComponent } from './lista/lista.component';

@Component({
  selector: 'miapi-list-miapi',
  standalone: true,
  imports: [ListaComponent],
  templateUrl: './list-miapi.component.html',
  styleUrl: './list-miapi.component.css'
})
export class ListMiapiComponent implements OnInit{
  autos:autos | undefined
  constructor(private _srvAutos:AutosService){}

  ngOnInit(): void {
    this._srvAutos.getAllAutos().subscribe(aut => {
      this.autos = aut
    })
  }
}
