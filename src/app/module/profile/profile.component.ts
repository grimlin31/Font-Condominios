import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ResidentService } from "../../share/service/resident/resident.service";
import { UserInterface } from "../../share/model/user.interface";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { HouseService } from "../../share/service/house/house.service";
import { HouseInterface } from "../../share/model/house.interface";
import { CondominiumService } from "../../share/service/condominium/condominium.service";
import { CondominiumInterface } from "../../share/model/condominium.interface";
import { CommonFundService } from "../../share/service/common-fund/common-fund.service";
import { CommonfundInterface } from "../../share/model/commonfund.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogDataInterface } from "../../share/model/dialog-data.interface";
import { DialogHouseComponent } from "../../share/feature/dialog-house/dialog-house.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {

  isEdit = false;

  // @ts-ignore
  houses: HouseInterface[];
  // @ts-ignore
  condom: CondominiumInterface;

  // @ts-ignore
  private _user: UserInterface
  // @ts-ignore
  private _username: string;
  // @ts-ignore
  condomMap: Map<string,CondominiumInterface> = new Map();

  residentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  suscription = new Subscription();

  // @ts-ignore
  fundMap = new Map<string, CommonfundInterface>();

  set user(user: UserInterface) {
    this._user = user;
  }

  get user() { return this._user }
  get username() { return this.residentForm.get('username')?.value }

  constructor(
    private _residentService: ResidentService,
    private _houseService: HouseService,
    private _condomServices: CondominiumService,
    private _commonFundService: CommonFundService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.residentForm.disable();
    const { username } = this._route.snapshot?.params
    this._username = username;

    if (username){
      this.getData()
    }
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  public changeToEdit(): void{
    this.isEdit = !this.isEdit
    this.residentForm.disabled ?
      this.residentForm.enable() :
      this.residentForm.disable()
  }

  public submitChanges(){
    this.changeToEdit();
    const userInput = {...this.residentForm.getRawValue()}
    this._residentService.updateResident(this.user._id, userInput)
      .subscribe(
        (user) => {
              this.user = user;
              this.residentForm.patchValue(user);
              this._cdr.markForCheck();
        }
      );
  }

  getData() {
    const subUser = this._residentService.getByUsername(this._username)
      .subscribe(
        (user) => {
          console.log(user)
          this.user = user;
          this.resetHouseQuery();
          this.residentForm.patchValue(user);
          this._cdr.markForCheck();
        }
      )

    const houseSub = this._houseService.getHousesByResidentId()
      .subscribe(
        (houses: HouseInterface[]) => {
          this.houses = houses;
          this.houses.map((house) => {
            this._condomServices.getCondomById(house.condominiumId)
              .subscribe(condom => {
                this.condomMap.set(condom._id, condom)
                this._cdr.markForCheck()
              })
            this.resetFundQuery(house._id)
          });
          this._cdr.markForCheck();
        }
      )

    const fundSub = this._commonFundService.getCommonFundByHouse()
      .subscribe(
        ([fund, ...array ]:CommonfundInterface[]) => {
          this.fundMap.set(fund?.houseId, fund);
          this._cdr.markForCheck()
        }
      )

    this.suscription.add(subUser)
    this.suscription.add(houseSub)
    this.suscription.add(fundSub)
  }

  resetHouseQuery() {
    this._houseService.resetQueryRef(
      this._houseService.qrGetHousesByResidentId,
      { residentId: this.user?._id }
    )
  }

  resetFundQuery(houseId: string) {
    this._commonFundService.resetQueryRef(
      this._commonFundService.qrGetCommonFundByHouse,
      { houseId }
    )
  }

  showDetail(house: HouseInterface) {
    const dialog = this.openDialog(
      'House Detail',
      house
    )
  }

  private openDialog(title: string, house: HouseInterface) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    dialogConfig.data = {
      title,
      infoUser: this.user,
      condominium: this.condomMap.get(house?.condominiumId),
      infoHouse: house
    } as DialogDataInterface

    return this._dialog.open(DialogHouseComponent, dialogConfig);
  }

}
