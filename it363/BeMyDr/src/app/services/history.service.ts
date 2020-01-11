import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  history = [];
  constructor() {}

  getUserData() {
    const userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const tmp = {Id: userId, data: childSnapshot.val()};
        this.history.push(tmp);
    });
      // alert(JSON.stringify(this.history));
      return JSON.stringify(this.history);
    });
  }

  getDiagnosisByDate(date: string) {
    const userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/' + userId + date).once('value').then((snapshot) => {
      return JSON.stringify(snapshot.val());
    });
  }
}
