import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {
  ngOnInit(): void {

    // subject  
    const subject = new Subject()

    // subscribe 1
    subject.subscribe((item) => console.log(item))
    // subscribe 2
    subject.subscribe((item) => console.log(item))
    // subscribe 3
    subject.subscribe((item) => console.log(item))

    subject.next(Math.random())


    // behavor subject  
    const behavior = new BehaviorSubject<number>(12)
    behavior.subscribe(item => console.log('behavior subject', item))

    behavior.next(200)

    // ReplaySubject
    const replay = new ReplaySubject<String>(1)
    replay.next('a1')
    replay.next('a2')
    replay.next('a3')
    replay.next('a4')
    replay.subscribe(item => console.log(item))
    replay.next('a5')

    //async subject
    const asyncsubject = new AsyncSubject()
    asyncsubject.next('value 1')
    asyncsubject.next('value 2')
    asyncsubject.next('value 3')
    asyncsubject.subscribe(item => console.log('print 1', item))
    asyncsubject.complete()
    asyncsubject.next('value 4')
    asyncsubject.subscribe(item => console.log('print 2', item))


    const url = "https://restcountries.com/v3.1/name/india?fullText=true"
    const data: any = {}
    function getinfo(url: any) {
      if (!data[url]) {
        data[url] = new AsyncSubject()
        fetch(url).
          then((res: any) => res.json())
          .then((item: any) => {
            data[url].next(item)
            data[url].complete()
          })
      }
      return data[url].asObservable()
    }

    getinfo(url).subscribe((data: any) => console.log(data))
  }
}
