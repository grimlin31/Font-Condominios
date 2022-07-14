import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ResidentService } from "../../share/service/resident/resident.service";
import { UserInterface } from "../../share/model/user.interface";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  todos: any[] = [];
  error: any;

  residentForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  suscription = new Subscription();

  constructor(
    private _residentService: ResidentService
  ) { }

  addResident() {
    // apollo graphql query to add todo
    const addSub = this._residentService.addResident(
      this.residentForm.getRawValue()
    ).subscribe(
      (resident) => {
        this._residentService.getAllResident().subscribe()
      },
      (err) => this.error = err
    );

    this.suscription.add(addSub)
  }

  deleteResident(id?: String) {
    const delSub= this._residentService.deleteResident(
      id || this.residentForm.value._id
    ).subscribe(
      ()=>{},
      (err) => this.error = err,
    );

    this.suscription.add(delSub);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
