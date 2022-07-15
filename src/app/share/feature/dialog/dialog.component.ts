import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogDataInterface } from "../../model/dialog-data.interface";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  data: DialogDataInterface

  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogDataInterface
  ) {
    this.data = data;
  }

  ngOnInit(): void {

  }



  close() {
    if(this.data?.redirect) {
      this._router.navigate([''])
      this.dialogRef.close();
    }
    this.dialogRef.close();
  }

}
