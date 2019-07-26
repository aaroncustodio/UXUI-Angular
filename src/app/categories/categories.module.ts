import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoriesComponent } from './categories.component';
import { CategoryRoutes } from './categories.routing';
import { AddCategoryDialog } from './categories.component';
import { ConfirmActionDialog } from "./categories.component";

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(CategoryRoutes)
  ],
  declarations: [
    CategoriesComponent,
    AddCategoryDialog,
    ConfirmActionDialog
  ],
  entryComponents: [
    AddCategoryDialog,
    ConfirmActionDialog
  ]
})
export class CategoriesModule {}