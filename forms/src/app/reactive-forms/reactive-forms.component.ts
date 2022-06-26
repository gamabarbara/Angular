import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

/*   controlNome: FormControl = new FormControl('') 
formUsuario: FormGroup = new FormGroup({
  nome: new FormControl('', [ Validators.required ]), 
  username: new FormControl('', [ Validators.required, Validators.minLength(8) ]), 
  email: new FormControl('', [ Validators.required, Validators.email]), 
  senha: new FormControl('', [ Validators.required, Validators.minLength(8)]), 
  genero: new FormControl('', [ Validators.required ]),
  termos: new FormControl(true, [ Validators.requiredTrue ]) 

})
O requiredTrue é utilizado para validar se o campo está marcado ou não */

formUsuario: FormGroup = this.fb.group({
  nome: ['', [Validators.required]], 
  username: ['', [Validators.required, Validators.minLength(8)]], 
  email: ['', [Validators.required]], 
  senha: ['', [Validators.required, Validators.minLength(8)]], 
  genero: ['', [Validators.required]], 
  termos: [false, [Validators.required]], 
  telefones: this.fb.array([
    this.fb.control('') //['']
  ])
})  

tels: FormArray = this.formUsuario.get('telefones') as FormArray

constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  enviar(): void {
    console.log(this.formUsuario.value)
    console.log(this.formUsuario.controls)

    //this.formUsuario.remove

  }

  adicionarCampoTelefone(): void {
    if(this.tels.controls.length <3){
    this.tels.controls.push(this.fb.control('', [ Validators.required]))
  }
}

}
