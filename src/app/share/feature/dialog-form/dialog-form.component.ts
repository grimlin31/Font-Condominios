import { Component, Inject, OnInit } from '@angular/core';
import { DialogDataInterface } from "../../model/dialog-data.interface";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserInterface } from "../../model/user.interface";

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  data: DialogDataInterface

  formResident = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  get email() {return this.formResident.get('email')}

  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogDataInterface
  ) {
    this.data = data;

    if (data.infoUser) {
      this.formResident.patchValue(data.infoUser);
    }
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  accept() {
    if (this.data.type?.delete) {
      this.dialogRef.close(true)
    } else if (this.data.type.create) {
      this.dialogRef.close(this.formResident.getRawValue() as Partial<UserInterface>)
    } else if (this.data.type?.edit) {
      this.dialogRef.close(this.formResident.getRawValue() as Partial<UserInterface>)
    }
  }

}
