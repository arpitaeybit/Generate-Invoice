import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Component({
  selector: 'app-inputfilds',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inputfilds.component.html',
  styleUrl: './inputfilds.component.css'
})
export class InputfildsComponent {
  inputdata: FormGroup
  constructor(private fb: FormBuilder) {
    this.inputdata = this.fb.group({
      email: this.fb.array([])
    })

    this.addinput()
  }

  get emailFormArray(): FormArray {
    return this.inputdata.get('email') as FormArray;
  }

  addinput() {
    let data = this.fb.group({ email: '' })
    this.emailFormArray.push(data)
  }
}
