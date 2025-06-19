import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubjectComponent } from './component/subject/subject/subject/subject.component';

@Component({
  selector: 'app-root',
imports: [RouterOutlet, SubjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'forarray';
}
