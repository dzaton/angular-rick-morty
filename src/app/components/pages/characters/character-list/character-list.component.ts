import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
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
  private query: string='';
  private hodeScrollHeight =200;
  private showScrollHeight = 500;

  constructor(private characterSvc: CharacterService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCharactersByQuery()
    //this.getDataFromService();
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.query = params['q'];
      this.getDataFromService();
    });
  }

private getDataFromService (): void{
  this.characterSvc
    .searchCharacters(this.query, this.pageNum)
    .pipe(take(1))
        .subscribe((res:any)=>{
          // ? optional chainning para comprobar que las propiedades existan
          if(res?.results?.length){
            //console.log('Response ->',res)
            const{info, results}= res;
            this.characters=[...this.characters, ...results]
            this.info=info;
          }else{
            this.characters=[]
          }
          
        });

}

}
