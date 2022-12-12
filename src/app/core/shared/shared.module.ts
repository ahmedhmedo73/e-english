import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//modules
import { AntModule } from './modules/ant.module';
import { PrimengModule } from './modules/primeng.module';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [],
  imports: [
    AntModule,
    PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    PrimengModule,
  ],
})
export class SharedModule {}
