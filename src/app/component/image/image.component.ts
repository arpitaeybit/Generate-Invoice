import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {
  selctedfile: File | null = null
  constructor(private http: HttpClient) { }
  fileupload(event: Event) {
    const input = event.target as HTMLInputElement
    console.log(input);
    console.log('Upload');

    if (input.files && input.files[0]) {
      this.selctedfile = input.files[0]
    }
  }
  submitimg() {
    if (!this.selctedfile) return;
    const formdata = new FormData;
    formdata.append('image', this.selctedfile)
    formdata.append('name', 'arpit')

    this.http.post('http://localhost:3000/upload', formdata).subscribe((res) => {
      console.log(res);
    })
  }
}
