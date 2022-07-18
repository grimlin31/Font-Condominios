import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CondominiumInterface } from "../../../share/model/condominium.interface";
import { UserInterface } from "../../../share/model/user.interface";
import { Location } from "@angular/common";
import { CondominiumService } from "../../../share/service/condominium/condominium.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-condominium',
  templateUrl: './admin-condominium.component.html',
  styleUrls: ['./admin-condominium.component.scss']
})
export class AdminCondominiumComponent implements OnInit {

  condoms = new MatTableDataSource<CondominiumInterface>([]);
  // @ts-ignore
  private user: UserInterface;
  // @ts-ignore
  columnName: string[] = [
    'position',
    'name',
    'actions'
  ];

  constructor(
    private location: Location,
    private _router: Router,
    private _condominiumService: CondominiumService,
    private _cdr: ChangeDetectorRef,
  ) {
    this.getCondominium();
  }

  ngOnInit(): void {
    this.user = this.location.getState() as UserInterface;
    this._condominiumService.resetQueryRef(
      this._condominiumService.qrGetCondomOwnerById,
      { owner_id: this.user._id }
    )
  }

  public getCondominium() {
    this._condominiumService.getCondomByOwnerId().subscribe(
      (condoms: CondominiumInterface[]) => {
        this.condoms.data = [...condoms]
          .map((condom, index) => {
            return {
              ...condom,
              position: index + 1
            };
          });
        this._cdr.markForCheck();
      }
    )
  }

  public goToHouse(condominium: CondominiumInterface):void {
    this._router.navigate(['admin', this.user.username, 'condom', condominium._id], {
      state: {
        user: this.user,
        condominium: condominium
      }
    })
  }

}
