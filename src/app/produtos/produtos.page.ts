import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../models/Produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  constructor(private route:Router, private produtoService: ProdutoService) { }
  listaProdutos: Produto[] = [];
    
  async getProducts() {
      this.listaProdutos = await this.produtoService.getAll();
      console.log(this.listaProdutos);
    }

  ngOnInit() : void {
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  async cadNovo(){
    this.route.navigateByUrl('/cadproduto')
  }


}
