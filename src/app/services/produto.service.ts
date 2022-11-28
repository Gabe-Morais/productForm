import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  listaProdutos: Produto[] = [];

  constructor(private storageService: StorageService) { }

  async save(produto: Produto) {
    await this.getAll();
    this.listaProdutos[produto.id] = produto;
    await this.storageService.set('produtos', this.listaProdutos);
  }

  async getOne(id:number) {
      await this.getAll();
      await this.listaProdutos[id];
   }
   
  async getAll() {
    this.listaProdutos = await this.storageService.get('produtos') as null as Produto[];
    if (!this.listaProdutos) {
      this.listaProdutos = [];
    }
    return this.listaProdutos;
  }

  async delete(id: number) { 
    await this.getAll();
    this.listaProdutos.slice(id, 1);
    await this.storageService.set('produtos', this.listaProdutos)
  }

  async saveId(id: number) {
    await this.storageService.set('idProduto', id);
  }

  async getId() {
    const id = await this.storageService.get('idProduto');
    if (!id) {
      return 0;
    }
    return id;
  }
}
