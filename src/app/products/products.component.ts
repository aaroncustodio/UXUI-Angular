import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProductService } from "./product.service";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MatSnackBar } from '@angular/material';

export interface Product {
  id: number;
  isActive: boolean;
  name: string;
  description: string;
  price: number;
  imageURL: string;
}

// const products: Product[] = [
//   { id:1, isActive:true, name:"Acne Patch", description:"Soothes blemishes and reduces redness", price:200, imageURL:"https://media.allure.com/photos/5b3516587e78420b655f86d3/1:1/w_400%2Cc_limit/Nexcare-Acne-Absorbing-Covers.jpg" },
//   { id:2, isActive:false, name:"Ceramidin Cream", description:"Formulated with patented ceramide", price:2350, imageURL:"https://www.sephora.com/productimages/sku/s2077840-main-zoom.jpg" },
//   { id:3, isActive:false, name:"Miracle Toner", description:"Leaves the skin flawless", price:990, imageURL:"https://d1gnt0aflnpn8l.cloudfront.net/catalog/product/cache/image/beff4985b56e3afdbeabfc89641a4582/1/2/1208-somebymi-aha-bha-pha-30days-miracle-toner-thumbnail.jpg" },
//   { id:4, isActive:true, name:"UV Watery Essence", description:"Provide superior sun protection", price:488, imageURL:"https://cdn.hermo.my/hermo/Uploads/2017/06/images/Biore-1(1).JPG" },
//   { id:5, isActive:true, name:"Drying Lotion", description:"Helps dry up pesky pimples overnight", price:1280, imageURL:"https://di2ponv0v5otw.cloudfront.net/posts/2018/09/20/5ba4470c8ad2f96e400ecd71/m_5ba8273781bbc88f85d92a5b.jpg" },
//   { id:6, isActive:true, name:"Acne Patch", description:"Soothes blemishes and reduces redness", price:200, imageURL:"https://media.allure.com/photos/5b3516587e78420b655f86d3/1:1/w_400%2Cc_limit/Nexcare-Acne-Absorbing-Covers.jpg" },
//   { id:7, isActive:false, name:"Ceramidin Cream", description:"Formulated with patented ceramide", price:2350, imageURL:"https://www.sephora.com/productimages/sku/s2077840-main-zoom.jpg" },
//   { id:8, isActive:false, name:"Miracle Toner", description:"Leaves the skin flawless", price:990, imageURL:"https://d1gnt0aflnpn8l.cloudfront.net/catalog/product/cache/image/beff4985b56e3afdbeabfc89641a4582/1/2/1208-somebymi-aha-bha-pha-30days-miracle-toner-thumbnail.jpg" },
//   { id:9, isActive:true, name:"UV Watery Essence", description:"Provide superior sun protection", price:488, imageURL:"https://cdn.hermo.my/hermo/Uploads/2017/06/images/Biore-1(1).JPG" },
//   { id:10, isActive:true, name:"Drying Lotion", description:"Helps dry up pesky pimples overnight", price:1280, imageURL:"https://di2ponv0v5otw.cloudfront.net/posts/2018/09/20/5ba4470c8ad2f96e400ecd71/m_5ba8273781bbc88f85d92a5b.jpg" },
//   { id:11, isActive:true, name:"Acne Patch", description:"Soothes blemishes and reduces redness", price:200, imageURL:"https://media.allure.com/photos/5b3516587e78420b655f86d3/1:1/w_400%2Cc_limit/Nexcare-Acne-Absorbing-Covers.jpg" },
//   { id:12, isActive:false, name:"Ceramidin Cream", description:"Formulated with patented ceramide", price:2350, imageURL:"https://www.sephora.com/productimages/sku/s2077840-main-zoom.jpg" },
//   { id:13, isActive:false, name:"Miracle Toner", description:"Leaves the skin flawless", price:990, imageURL:"https://d1gnt0aflnpn8l.cloudfront.net/catalog/product/cache/image/beff4985b56e3afdbeabfc89641a4582/1/2/1208-somebymi-aha-bha-pha-30days-miracle-toner-thumbnail.jpg" },
//   { id:14, isActive:true, name:"UV Watery Essence", description:"Provide superior sun protection", price:488, imageURL:"https://cdn.hermo.my/hermo/Uploads/2017/06/images/Biore-1(1).JPG" },
//   { id:15, isActive:true, name:"Drying Lotion", description:"Helps dry up pesky pimples overnight", price:1280, imageURL:"https://di2ponv0v5otw.cloudfront.net/posts/2018/09/20/5ba4470c8ad2f96e400ecd71/m_5ba8273781bbc88f85d92a5b.jpg" }
// ];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, AfterViewInit {
    //from api project
    mode: string = "Create"
    products: Product[];
    errorMsg: string;
  
    isVisible: boolean = false;
    productForm: FormGroup;
    productToAdd: any = {};
    //from api project
  
    dataSource: MatTableDataSource<Product>;
    displayedColumns: string[] = ['select', 'imageURL', 'id', 'name', 'description', 'price', 'isActive', 'action'];
    selection = new SelectionModel<Product>(true, []);

  constructor(public dialog: MatDialog,
    private _productService: ProductService,
    private _formBuilder: FormBuilder){

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(){
    this.displayProducts();
    this.dataSource = new MatTableDataSource(this.products);
  }

  initProductForm(isNew: boolean) {
    if (isNew) {
      this.productForm = this._formBuilder.group({
        id: [''],
        name: [''],
        description: [''],
        imageURL: [''],
        price: ['']
        ,
        isActive: [true]
      });
    } else {
      this.productForm = this._formBuilder.group({
        id: [this.productToAdd.id],
        name: [this.productToAdd.name],
        description: [this.productToAdd.description],
        imageURL: [this.productToAdd.imageURL],
        price: [this.productToAdd.price]
        ,
        isActive: [this.productToAdd.isActive]
      });
    }
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  displayProducts(){
    this._productService.getProducts()
    .subscribe(product => this.products = product,
      error => this.errorMsg = error);
  }

  deleteProduct(id: number) {
    this._productService.deleteItem(id)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProducts();
      }, error => this.errorMsg = error);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.displayProducts();
      // add result to product list
    });
  }

  openConfirmDialog(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmActionDialog, {
      width: '300px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null || result != undefined){
        this.deleteProduct(result);
      }
    });
  }
}

@Component({
  selector: 'add-product-dialog',
  templateUrl: 'add-product-dialog.html',
  styleUrls: ['./add-product-dialog.css']
})

export class AddProductDialog {

  // newProduct: Product;
  // id: number = 1;
  // name: string = '1';
  // isActive: boolean = true;
  // description: string = '1';
  // price: number = 1;
  // imageURL: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _productService: ProductService,
    private _formBuilder: FormBuilder) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // addProduct(){
  //   this.newProduct = {
  //     id: this.id,
  //     name: this.name,
  //     isActive: this.isActive,
  //     description: this.description,
  //     price: this.price,
  //     imageURL: this.imageURL
  //   }
  // }

  //from api project
  mode: string = "Create"
  products: Product[];
  errorMsg: string;

  isVisible: boolean = false;
  productForm: FormGroup;
  productToAdd: any;
  //from api project

  dataSource: MatTableDataSource<Product>;
  // displayedColumns: string[] = ['select', 'imageURL', 'id', 'name', 'description', 'price', 'isActive', 'action'];
  selection = new SelectionModel<Product>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(){
    this.initProductForm(true);
    this.displayProducts();
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  initProductForm(isNew: boolean) {
    if (isNew) {
      this.productForm = this._formBuilder.group({
        id: [''],
        name: [''],
        description: [''],
        imageURL: [''],
        price: ['']
        ,
        isActive: [true]
      });
    } else {
      this.productForm = this._formBuilder.group({
        id: [this.productToAdd.id],
        name: [this.productToAdd.name],
        description: [this.productToAdd.description],
        imageURL: [this.productToAdd.imageURL],
        price: [this.productToAdd.price]
        ,
        isActive: [this.productToAdd.isActive]
      });
    }
  }

  assignProductFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.productForm.value);

    if (isNew) {
      this.productToAdd = {}
      this.productToAdd.name = formValues['name'];
      this.productToAdd.description = formValues['description'];
      this.productToAdd.imageURL = formValues['imageURL'];
      this.productToAdd.price = formValues['price'];
      this.productToAdd.isActive = formValues['isActive'];
    } else {
      this.productToAdd = {}
      this.productToAdd.id = formValues['id'];
      this.productToAdd.name = formValues['name'];
      this.productToAdd.description = formValues['description'];
      this.productToAdd.imageURL = formValues['imageURL'];
      this.productToAdd.price = formValues['price'];
      this.productToAdd.isActive = formValues['isActive'];
    }
  }

  displayProducts(){
    this._productService.getProducts()
    .subscribe(product => this.products = product,
      error => this.errorMsg = error);
  }

  addProduct() {
    // ''this.productToAdd.id = this.items.slice(-1).find( x => this.id = x.id+1);''
    this.assignProductFormValue(true)
    this._productService.addItem(this.productToAdd)
      .subscribe(data => {
        this.initProductForm(true);
      }, error => { this.errorMsg = error });
    console.log(this.productForm.value)
  }

  updateProduct() {
    this.assignProductFormValue(false)
    this._productService.updateItem(this.productToAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProducts();
      }, error => { this.errorMsg = error });
  }

  submitForm() {
    if (this.mode == "Create") {
      this.addProduct()
    } else {
      this.updateProduct()
    }
  }

  showProduct() {
    this.isVisible = !this.isVisible;
  }

  showUpdateForm(item: Product) {
    this.isVisible = !this.isVisible;

    this.productToAdd.id = item.id;
    this.productToAdd.name = item.name;
    this.productToAdd.description = item.description;
    this.productToAdd.price = item.price;
    this.productToAdd.imageURL = item.imageURL;
    this.productToAdd.isActive = item.isActive;
    this.mode = "Edit";
    this.initProductForm(false);
  }

  // openSnackBar(message: string, action: string){
  //   this._snackBar.open(message, action, {duration: 2000,
  //   });
  // }
}

@Component({
  selector: 'delete-product-dialog',
  templateUrl: 'delete-product-dialog.html'
})

export class ConfirmActionDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.data);
    this.openSnackBar('Delete successful.', 'Close')
  }

  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, {duration: 2000,
    });
  }
}