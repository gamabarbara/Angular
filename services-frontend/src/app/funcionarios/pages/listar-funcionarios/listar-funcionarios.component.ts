import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormFuncionarioComponent } from '../../components/form-funcionario/form-funcionario.component';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';


@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {

  funcionarios: Funcionario[] = []
  colunas: Array<string> = ['id', 'nome', 'email', 'actions']

  constructor(
    private funcService: FuncionarioService, 
    private dialog: MatDialog, // responsável por abrir o componente confirtmar-delecao na tela 
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // 1° sucesso -> retorna os dados
    // 2° erro -> ocorre um erro na fonte de dados
    // 3° complete -> a fonte de dados te retorna tudo

    this.recuperarFuncionarios();
   
  }

  deletarFuncionario(id: number): void {
    //A função open() do dialog vai abrir o seu componente na tela com uma caixa de diálogo. 
    //Basta informar a classe do componente que ele precisa abrir pra você e ele te retornará uma referência desse componente que está aberto na sua tela 
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
    .subscribe(
      (deletar) => {
        if(deletar == true){
          this.funcService.deleteFuncionario(id)
          .subscribe(
            () => {
              this.snackbar.open('Funcionário deletado', 'Ok', {
                duration: 3000
              })
              this.recuperarFuncionarios()
            }, 
            (error) => {
              this.snackbar.open('Não foi possível deletar o funcionário', 'Ok', {
                duration: 3000
              })
              console.log(error)
            }
          )
        }
      }
    )
  }

  recuperarFuncionarios(): void {
    this.funcService.getFuncionarios().subscribe(
      (funcs) => { // sucesso
        this.funcionarios = funcs.reverse()
        //O reverse reverterá o array para que na lista os funcionarios aparecam do mais novo para o mais antigo
      },
      (erro) => { // erro
        console.log(erro)
      },
      () => { // complete
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormFuncionario(): void {
    const referenciaDialog = this.dialog.open(FormFuncionarioComponent) //Abrindo o formulário do funcionário e recuperando a referência desse componente e guardando na variável

    //A função Afterclosed nos retorna um observable, notifica quando o dialog acabou de ser fechado. Quando ele for fechado, chamaremos a funcao que faz a requisição dos funcionários novamente
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarFuncionarios()
      }
    )
  }
}