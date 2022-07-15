import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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

  get username() {return this.formLogin.get('username')?.value}
  get password() {return this.formLogin.get('password')?.value}

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  public loginSubmit(): void {
    this._router.navigate(['resident', this.username], {
      state: {
        password: this.password,
      }
    })
  }

}
