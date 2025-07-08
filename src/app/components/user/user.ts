import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [AsyncPipe],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  name$!: Observable<string>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.name$ = this.userService.name$;
  }

  setToJoan() {
    this.userService.setNameToJoan();
  }

  setToJordi() {
    this.userService.setNameToJordi();
  }

  setToAlba() {
    this.userService.setNameToAlba();
  }
}