import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private nameSubject = new BehaviorSubject<string>('Usuari');  //Manté el valor actual i emet aquest valor cada vegada que canvia
  name$: Observable<string> = this.nameSubject.asObservable();  //Covertim el subject a Observable només de lectura. Això vol dir que desde fora del servei només es pot llegir el valor, no es pot modificar

  setNameToJoan() {
    this.nameSubject.next('Joan');
  }

  setNameToJordi() {
    this.nameSubject.next('Jordi');
  }

  setNameToAlba() {
    this.nameSubject.next('Alba');
  }
}