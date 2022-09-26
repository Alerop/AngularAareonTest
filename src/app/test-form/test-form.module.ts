import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestFormComponent } from './test-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TestFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [TestFormComponent]
})
export class TestFormModule { }
