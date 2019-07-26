import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface Category {
  id: number;
  isActive: boolean;
  name: string;
  description: string;
}

const categories: Category[] = [
  { id:1, isActive:true, name:"Anti-Aging", description:"Masking or preventing signs of skin aging" },
  { id:2, isActive:false, name:"Dry Skin", description:"Hydrates the skin and locks in moisture" },
  { id:3, isActive:false, name:"Acne", description:"For reducing/eliminating acne" },
  { id:4, isActive:true, name:"Brightening", description:"Make your skin glow" },
  { id:5, isActive:true, name:"Sensitive Skin", description:"Caring for sensitive skin" },
  { id:1, isActive:true, name:"Anti-Aging", description:"Masking or preventing signs of skin aging" },
  { id:2, isActive:false, name:"Dry Skin", description:"Hydrates the skin and locks in moisture" },
  { id:3, isActive:false, name:"Acne", description:"For reducing/eliminating acne" },
  { id:4, isActive:true, name:"Brightening", description:"Make your skin glow" },
  { id:5, isActive:true, name:"Sensitive Skin", description:"Caring for sensitive skin" },
  { id:1, isActive:true, name:"Anti-Aging", description:"Masking or preventing signs of skin aging" },
  { id:2, isActive:false, name:"Dry Skin", description:"Hydrates the skin and locks in moisture" },
  { id:3, isActive:false, name:"Acne", description:"For reducing/eliminating acne" },
  { id:4, isActive:true, name:"Brightening", description:"Make your skin glow" },
  { id:5, isActive:true, name:"Sensitive Skin", description:"Caring for sensitive skin" },
  { id:1, isActive:true, name:"Anti-Aging", description:"Masking or preventing signs of skin aging" },
  { id:2, isActive:false, name:"Dry Skin", description:"Hydrates the skin and locks in moisture" },
  { id:3, isActive:false, name:"Acne", description:"For reducing/eliminating acne" },
  { id:4, isActive:true, name:"Brightening", description:"Make your skin glow" },
  { id:5, isActive:true, name:"Sensitive Skin", description:"Caring for sensitive skin" }
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  constructor(public dialog: MatDialog){}

  dataSource = new MatTableDataSource<Category>(categories);
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'isActive', 'action'];
  selection = new SelectionModel<Category>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(){
    this.dataSource.paginator = this.paginator;
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
  checkboxLabel(row?: Category): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // add result to category list
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmActionDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // delete selected category
    });
  }
}

@Component({
  selector: 'add-category-dialog',
  templateUrl: 'add-category-dialog.html',
  styleUrls: ['./add-category-dialog.css']
})

export class AddCategoryDialog {

  newCategory: Category;
  id: number = 1;
  name: string = '1';
  isActive: boolean = true;
  description: string = '1';

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Category) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(){
    this.newCategory = {
      id: this.id,
      name: this.name,
      isActive: this.isActive,
      description: this.description
    }
  }
}

@Component({
  selector: 'delete-category-dialog',
  templateUrl: 'delete-category-dialog.html'
})

export class ConfirmActionDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Category) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCategory(){

  }
}