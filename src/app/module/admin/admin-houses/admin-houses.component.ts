import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HouseService } from "../../../share/service/house/house.service";
import { HouseInterface } from "../../../share/model/house.interface";
import { MatTableDataSource } from "@angular/material/table";
import { Location } from "@angular/common";
import { UserInterface } from "../../../share/model/user.interface";
import { CondominiumInterface } from "../../../share/model/condominium.interface";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogHouseComponent } from "../../../share/feature/dialog-house/dialog-house.component";
import { DialogDataInterface } from "../../../share/model/dialog-data.interface";

interface StateData {
  user: UserInterface,
  condominium: CondominiumInterface,
}

@Component({
  selector: 'app-admin-houses',
  templateUrl: './admin-houses.component.html',
  styleUrls: ['./admin-houses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHousesComponent implements OnInit {

  houses = new MatTableDataSource<HouseInterface>([]);

  columnName = [
    'position',
    'name',
    'resident',
    'actions'
  ]
  // @ts-ignore
  private condominium: CondominiumInterface;
  // @ts-ignore
  private user: UserInterface;

  constructor(
    private _housesServices: HouseService,
    private _routes: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _location: Location,
    private _dialog: MatDialog,
  ) {
    this.getHouses();
  }

  ngOnInit(): void {
    const { user, condominium } = this._location.getState() as StateData;
    this.condominium = condominium;
    this.user = user;
    const { condom_id } = this._routes.snapshot.params
    if (condom_id) {
      this._housesServices.resetQueryRef(
        this._housesServices.qrGetHousesByCondomId,
        {
          condominiumId: condom_id
        }
      )
    }
  }

  private getHouses(){
    this._housesServices.getHousesByCondomId().subscribe(
      (houses: HouseInterface[]) => {
        this.houses.data = [...houses].map(
          (house, index) => {
            return {
              ...house,
              position: index + 1
            }
          }
        );
      }
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
      condominium: this.condominium,
      infoHouse: house
    } as DialogDataInterface

    return this._dialog.open(DialogHouseComponent, dialogConfig);
  }

  openHouseDialog(element: HouseInterface) {
    const dialog = this.openDialog(
      'House Detail',
      element
    )
  }
}
