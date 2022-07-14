import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  formLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  get username() { return this.formLogin.get('username')?.value};
  get password() { return this.formLogin.get('password')?.value};

  constructor(
    private _route: Router
  ) { }

  ngOnInit(): void {
  }

  public loginSubmit(): void {
    this._route.navigate(['admin', this.username], {
      state: {
        password: this.password,
      }
    })
  }

}
