import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [],
  exports: [DialogModule, DropdownModule, ToastModule, TableModule],
})
export class PrimengModule {}
