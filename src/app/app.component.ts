import { Component } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularFire';
  courses: Observable<any[]>
  clients: Observable<any[]>

  constructor( private db : AngularFireDatabase) {
   this.courses= db.list('courses').valueChanges()
    this.clients= db.list('clients').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as object })
      )))

      

  }
  add(data) {
    this.db.list('courses').push(data.value);
    data.value ='';
  }

  update(key, value) {
    this.db.list('clients').update(key, {
      lastName: value
    })
  }
  delete(key) {
    this.db.list('clients').remove(key);
  }
}
