import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogDataInterface } from "../../model/dialog-data.interface";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})
export class DialogPaymentComponent implements OnInit {

  // @ts-ignore
  data: DialogDataInterface;

  form: FormGroup;
  private readonly max: number;

  get paidAmount() { return this.form.get('paidAmount')}

  constructor(
    public dialogRef: MatDialogRef<DialogPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogDataInterface,
  ) {
    this.data = data;
    // @ts-ignore
    this.max = this.data.transaction?.amount - this.data.transaction?.payedAmount
    this.form =new FormGroup({
      paidAmount: new FormControl(
        0,
        [
          Validators.required,
          this.maxValidator(this.max)
        ]
      )
    })
  }

  ngOnInit(): void {
  }
  private maxValidator(max?: number): ValidatorFn {
    return (control: AbstractControl) => {
      return (control.value && max)
        ? Validators.max(max)(control) :
        null
    };
  }

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (ctrl: FormControl) => (ctrl && ctrl.invalid)
  };

  pay() {
    if (this.max < this.paidAmount?.value) {
      return;
    };
    this.dialogRef.close(this.paidAmount?.value)
  }

  close(){
    this.dialogRef.close()
  }
}
