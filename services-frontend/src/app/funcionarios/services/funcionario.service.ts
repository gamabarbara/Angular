import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage' // importação do fireStorage

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:3000/funcionarios'

  constructor(
    private http: HttpClient,  // Faz as requisições HTTP dentro do Angular
    private storage: AngularFireStorage // Objeto responsável por salvar as imagens no firebase
  ) { }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  // http://localhost:3000/funcionarios/
  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }
  //http://localhost:3000/funcionarios/2 URL

  getFuncionarioById(id: number): Observable<Funcionario>{
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }

  salvarFuncionario(func: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, func)
  }

  atualizarFuncionario(func: Funcionario): Observable<Funcionario>{
    return this.http.put<Funcionario>(`${this.baseUrl}/${func.id}`, func)
  }

  // 1° Pegar a imagem
  // 2° Fazer o upload da imagem 
  // 3° Gerar o link de download e retorná-lo
  
  async uploadImagem(foto: File): Promise<string> {
    // A palavra chave async informa que a função vai trabalhar com código assíncrono, ou seja, códigos que demoram para serem executados.

    const nomeDoArquivo = Date.now() //retorna a data atual em mílissegundos.

    //Faz o upload do arquivo para o firebase
    // 1° Parâmetro: nome do arquivo
    // 2° Parâmetro: o arquivo que deve ser enviado
   const dados = await this.storage.upload(`${nomeDoArquivo}`, foto)

   // A propriedade REF é a referência do arquivo no firebase
   const downloadURL = await dados.ref.getDownloadURL() // Retorna um link pro acesso da imagem
    return downloadURL
  }


}