import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
const modules = [
  CommonModule,
  DropdownModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  DialogModule,
  InputTextModule,
  DataViewModule,
  TagModule,
  FormsModule,
  CalendarModule
];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class SharedModule {}
