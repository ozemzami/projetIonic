import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AuthCredential} from '@firebase/auth-types';
@Injectable()
export class AuthenticateService {
  constructor() {}

  writeUserData(first, last, email, userRecord, old, sexe) {
    firebase.database().ref('/' + userRecord + '/infos').set({
      firstname: first,
      lastname: last,
      mail: email,
      age: old,
      sex: sexe
    });
    firebase.database().ref('/' + userRecord + '/infos/user_preferences').set({
      nb_diseases: 3,
      nb_questions: 9,
    });
  }

  registerUser(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {
        console.log(firebase.auth().currentUser.uid);
        this.writeUserData(value.firstname, value.lastname, value.email, firebase.auth().currentUser.uid, value.old, value.sexe);
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
