import { Component, OnInit } from '@angular/core';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import {take} from 'rxjs/operators'
type RequestInfo={
  next:string;
};
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  //Array que utilizamos en el ngFor desde el html
  characters: Character[]= [];
  info: RequestInfo={
    next: '',
  };


  private pageNum=1;
  private query: string ='';
  private hodeScrollHeight =200;
  private showScrollHeight = 500;

  constructor(private characterSvc: CharacterService) { }

  ngOnInit(): void {
    this.getDataFromService();
  }


private getDataFromService (): void{
  this.characterSvc
    .searchCharacters(this.query, this.pageNum)
    .pipe(take(1))
        .subscribe((res:any)=>{
          console.log('Response ->',res)
          const{info, results}= res;
          this.characters=[...this.characters, ...results]
          this.info=info;
        });

}

}
