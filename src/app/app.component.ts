import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCYnyP1TRrpE-5LsCbR3zpNRx1a-CBhZZU',
      authDomain: 'ng-recipe-book-ef92e.firebaseapp.com'
    });
  }
}
