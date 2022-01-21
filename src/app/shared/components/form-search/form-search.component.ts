import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(value: string){
    console.log("Buscar ->", value)
    //TODO:
    //Empieza a hacer la busqueda cuando value sea True y mayor que 3 (3 caracteres mínimmo)
    if(value && value.length > 3){
      //La ruta donde queremos buscar:
      this.router.navigate(['/character-list'],{
        queryParams:{q:value},
      });
    }
  }

}
