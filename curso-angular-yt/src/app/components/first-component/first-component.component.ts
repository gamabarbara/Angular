import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  name: string = 'Bárbara';
  age: number = 27;
  job: string = 'Programmer';
  hobbies = ['correr', 'costurar', 'estudar'];
  car = {
    name: 'March', 
    year: 2014
  }
  constructor() { }

  ngOnInit(): void {
  }

}
