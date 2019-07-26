import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from "@angular/forms";

import { ProductsComponent } from './products.component';

import { ProductRoutes } from './products.routing';

import { AddProductDialog } from './products.component';
import { ConfirmActionDialog } from "./products.component";

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(ProductRoutes)
  ],
  providers: [
  ],
  declarations: [
    ProductsComponent,
    AddProductDialog,
    ConfirmActionDialog
  ],
  entryComponents: [
    AddProductDialog,
    ConfirmActionDialog
  ]
})
export class ProductsModule {}