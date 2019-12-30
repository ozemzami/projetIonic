import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class RecapService {
  constructor() {}

  getUserData() {
    const userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
      return JSON.stringify(snapshot.val());
    });
  }
}
