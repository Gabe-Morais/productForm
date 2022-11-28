import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../models/Produto.model';
import { ProdutoService } from '../services/produto.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-cadproduto',
  templateUrl: './cadproduto.page.html',
  styleUrls: ['./cadproduto.page.scss'],
})
export class CadprodutoPage implements OnInit {

    produto:Produto = new Produto()

    cadProdutoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao:['', Validators.compose([Validators.required, Validators.maxLength(300)])],
      dataVal: ['', Validators.required],
      valor: ['', Validators.required]
    });

    msgErro = {
      nome:[{tipo: 'required', aviso: 'Informe um nome para o produto'}],
      descricao:[{tipo: 'required', aviso: 'Insira uma descrição para este produto'}, {tipo: 'maxlength', aviso: 'O numero maximo de caracteres é de 300'}],
      dataVal:[{tipo: 'required', aviso: 'Insira uma data de validade'}],
      valor:[{tipo: 'required', aviso: 'Insira um valor para este produto'}]
    
    };


  constructor(private formBuilder: FormBuilder, private route:Router, private produtoService: ProdutoService, private bd: StorageService) { }

  get nome(){
    return this.cadProdutoForm.get('nome');
  }

  get descricao(){
    return this.cadProdutoForm.get('descricao');
  }

  get dataVal(){
    return this.cadProdutoForm.get('dataVal');
  }

  get valor(){
    return this.cadProdutoForm.get('valor');
  }

  ngOnInit() {
  }

  async cancelarCad(){
    this.route.navigateByUrl('/produtos')
  }

  async salvarProd(){
    if(this.cadProdutoForm.valid){
      this.produto.nome = this.cadProdutoForm.get('nome').value
      this.produto.descricao = this.cadProdutoForm.get('descricao').value
      this.produto.dataVal = this.cadProdutoForm.get('dataVal').value
      this.produto.valor = this.cadProdutoForm.get('valor').value

      const id = await this.produtoService.getId();

      this.produto.id = id;

      this.produtoService.save(this.produto);

      this.produtoService.saveId(id+1);
      alert('Sucesso!')
      this.route.navigateByUrl('/produtos')
    }else{
      alert('Fomulario Inválido.')
    }
  }

}
