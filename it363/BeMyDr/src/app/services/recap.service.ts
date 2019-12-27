import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class RecapService {
  constructor() {}

  getUserData() {
    const userId = firebase.auth().currentUser.uid;
    console.log(userId);
    return firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
      console.log(snapshot);
      const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log(username);
    });
  }
}
