import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListRoutingModule } from './character-list-routing.module';
import { CharacterListComponent } from './character-list.component';


@NgModule({
  //Al importar CharacterModule en el home module no hace falta declararlo
  declarations: [],
  imports: [
    CommonModule,
    CharacterListRoutingModule
  ]
})
export class CharacterListModule { }
