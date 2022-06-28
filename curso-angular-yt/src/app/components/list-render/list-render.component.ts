import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/Animal';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent implements OnInit {

  animals: Animal[] = [
    {name: "Luna", type: "Dog", age: 2}, 
    {name: "Tom", type: "Cat", age: 4}, 
    {name: "Frida", type: "Dog", age: 3}, 
    {name: "Bob", type: "Horse", age: 1}
  ]
  animalDetails = ''


  constructor() { }

  ngOnInit(): void {}

  showAge(animal: Animal): void {
    this.animalDetails = `O pet ${animal.name} tem ${animal.age} anos!`
  
  }

}
