import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {

  someText = "TESTANDO OS PIPES OPERATORS ";

  today = new Date()

  constructor() { }

  ngOnInit(): void {
  }

}
