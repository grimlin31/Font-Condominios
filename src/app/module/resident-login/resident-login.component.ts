import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-resident-login',
  templateUrl: './resident-login.component.html',
  styleUrls: ['./resident-login.component.scss']
})
export class ResidentLoginComponent implements OnInit {

  formLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  constructor() { }

  ngOnInit(): void {
  }

}
