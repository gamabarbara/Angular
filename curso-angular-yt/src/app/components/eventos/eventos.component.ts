import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  show: boolean = false;
  showImage: boolean = true;
  constructor() { }

  ngOnInit(): void {}

  showMessage(): void {
/*     if(this.show == true){
      this.show = false
    } else {
      this.show = true;
    } */
    this.show = !this.show; //toggle
  }

  showImagem(): void {
    this.showImage = !this.showImage
  }

}
