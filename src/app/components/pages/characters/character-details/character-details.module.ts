import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterDetailsRoutingModule } from './character-details-routing.module';
import { CharacterDetailsComponent } from './character-details.component';


@NgModule({
  //Al importar CharacterModule en el home module no hace falta declararlo
  declarations: [],
  imports: [
    CommonModule,
    CharacterDetailsRoutingModule
  ]
})
export class CharacterDetailsModule { }
