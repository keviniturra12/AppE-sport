import { inject, Injectable, NgZone } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthInterface } from '../interface/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);

  readonly authState$ = authState(this.auth);

  constructor( ) {}

  signUpWithEmailAndPassword(authinter: AuthInterface): Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, authinter.email,authinter.password)
  }
  
  logInWithEmailAndPassword(authinter: AuthInterface){
    return signInWithEmailAndPassword(
      this.auth,
      authinter.email,
      authinter.password
    );
  }



}
