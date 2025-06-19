import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public notificationsubject = new Subject<String>()

  constructor() { }

  sendNotification(data: any) {
    this.notificationsubject.next(data)
  }
}
