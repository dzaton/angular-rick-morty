import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

import {DOCUMENT} from '@angular/common';
import {take, filter} from 'rxjs/operators';

import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';

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

  showGoUpButton=false;
  private pageNum=1;
  private query: string='';
  private hideScrollHeight =200;
  private showScrollHeight = 500;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private characterSvc: CharacterService, 
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.onUrlChange();
    }

  ngOnInit(): void {
    this.getCharactersByQuery()
    //this.getDataFromService();
  }

  @HostListener('window:scroll',[])
  onWindowScroll():void{
    const yOffset = window.pageYOffset;
    if((yOffset || 
      this.document.documentElement.scrollTop || 
      this.document.body.scrollTop) > this.showScrollHeight){
        this.showGoUpButton = true;
      }else if(this.showGoUpButton && (yOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight){
        this.showGoUpButton = false;
      }
  }

  onScrollDown():void{
    if(this.info.next){
      this.pageNum++;
      this.getDataFromService();
    }
  }
  onScrollTop():void{
    this.document.body.scrollTop=0; //Safari
    this.document.documentElement.scrollTop=0; //PAra el resto de navegadores
  }
  //Este método se llama en el constructor
  //Buscar automáticamente al escribir en el search input
  private onUrlChange(){
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(
        () => {
          this.characters=[];
          this.pageNum=1;
          this.getCharactersByQuery();
        });
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
            this.characters=[];
          }
          
        });

}

}
