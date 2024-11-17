import { Component, Inject, OnInit } from '@angular/core';
import { SidenavComponent } from "../../sidenav/sidenav.component";
import { NavComponent } from "../../nav/nav.component";
import { Livre } from '../../../models/livre';
import { ImportsModule } from '../../../../imports';
import { ProductService } from '../../../services/productService';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-listbook',
  standalone: true,
  imports: [SidenavComponent, NavComponent, ImportsModule],
  providers: [MessageService, ConfirmationService, ProductService],
  templateUrl: './listbook.component.html',
  styleUrls: ['./listbook.component.css']
})
export class ListbookComponent implements OnInit {
  livreDialog: boolean = false;
  livres!: Livre[];
  livre!: Livre;
  selectedLivres!: Livre[] | null;
  submitted: boolean = false;
  categories!: any[];

  constructor(
    @Inject(ProductService) private productService: ProductService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.productService.getLivres().then((data) => (this.livres = data));
    this.categories = [
      { label: 'Roman', value: 'roman' },
      { label: 'Science-fiction', value: 'science-fiction' },
      { label: 'Fantastique', value: 'fantastique' }
    ];
  }

  openNew() {
    this.livre = {};
    this.submitted = false;
    this.livreDialog = true;
  }

  deleteSelectedLivres() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected books?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.livres = this.livres.filter((val) => !this.selectedLivres?.includes(val));
        this.selectedLivres = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Books Deleted', life: 3000 });
      }
    });
  }

  editLivre(livre: Livre) {
    this.livre = { ...livre };
    this.livreDialog = true;
  }

  deleteLivre(livre: Livre) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + livre.titre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.livres = this.livres.filter((val) => val.id !== livre.id);
        this.livre = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.livreDialog = false;
    this.submitted = false;
  }

  saveLivre() {
    this.submitted = true;
    if (this.livre.titre?.trim()) {
      if (this.livre.id) {
        this.livres[this.findIndexById(this.livre.id)] = this.livre;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Updated', life: 3000 });
      } else {
        this.livre.id = this.createId();
        this.livres.push(this.livre);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Book Created', life: 3000 });
      }
      this.livres = [...this.livres];
      this.livreDialog = false;
      this.livre = {};
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.livre.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  findIndexById(id: string): number {
    return this.livres.findIndex((livre) => livre.id === id);
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(disponibilite: boolean | undefined): "success" | "danger" {
    return disponibilite ? 'success' : 'danger';
  }
}
