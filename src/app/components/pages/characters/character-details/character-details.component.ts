import { Component, OnInit } from '@angular/core';
import { Character } from '@app/shared/interfaces/character.interface';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$: Observable<Character> | undefined;

  constructor(private route: ActivatedRoute, 
    private characterSvc: CharacterService, 
    private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) =>{
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id);
    });
  }

  onGoBack():void{
    this.location.back();
    //Otra forma: window.history.back()
  }
}
