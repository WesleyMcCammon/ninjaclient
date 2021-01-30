import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class MaterialDesignModule { }
