import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable()
export class AuthenticateService {
  constructor() {}

  writeUserData(first, last, email) {
    firebase.database().ref('users/').push().set({
      firstname: first,
      lastname: last,
      mail: email
    });
  }

  registerUser(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {
      this.writeUserData(value.firstname, value.lastname, value.email);
      resolve(res);
     })
     .catch(err => {
      reject(err);
   });
  });
}
  loginUser(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err));
   });
  }
  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          console.log('LOG Out');
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }
  userDetails() {
    return firebase.auth().currentUser;
  }
}
