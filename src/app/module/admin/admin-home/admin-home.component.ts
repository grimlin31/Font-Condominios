import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserInterface } from "../../../share/model/user.interface";
import { ResidentService } from "../../../share/service/resident/resident.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogDataInterface } from "../../../share/model/dialog-data.interface";
import { DialogFormComponent } from "../../../share/feature/dialog-form/dialog-form.component";
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from "rxjs";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHomeComponent implements OnInit {

  // @ts-ignore
  residents = new MatTableDataSource<UserInterface>([]);

  // @ts-ignore
  columnName: String[];

  constructor(
    private _route: ActivatedRoute,
    private _residentService: ResidentService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.columnName = [
      'name',
      'username',
      'email',
      'actions'
    ]
    this.getData();
  }

  public addNewResident() {
    const dialog = this.openDialog({
      title: 'New Resident',
      type: {create: true},
    })

    dialog.afterClosed().subscribe(
      (value)=> {
        if( value) {
          this._residentService.addResident({...value}).subscribe(
              (user) => {
                this._residentService.resetQueryRef(
                  this._residentService.qrGetAllResident
                )
              }
            )
        }

      }
    )
  }

  public deleteResident(element: UserInterface) {
    const dialog = this.openDialog({
      title: `Delete Resident`,
      message: `Are you sure want to delete ${element.name} ?`,
      type:{
        delete: true,
      }
    });

    dialog.afterClosed().subscribe(
      (canDelete) => {
        if (canDelete) {
          this._residentService.deleteResident(element._id).subscribe(
            (value) => {
              this._residentService.resetQueryRef(
                this._residentService.qrGetAllResident
              )
            }
          );
        }
      }
    )
  }

  public updateResident(element: UserInterface) {
    const dialog = this.openDialog({
      title: 'Update Resident',
      type: {edit: true},
      infoUser: element
    })

    dialog.afterClosed().subscribe(
      (value) => {
        if(value) {
          this._residentService.updateResident(element._id, {...value})
            .subscribe(
              (value) => {
                this._residentService.resetQueryRef(
                  this._residentService.qrGetAllResident
                )              }
            )
        }
      }
    )
  }

  private openDialog(
    genericInputs: DialogDataInterface
  ) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      ...genericInputs
    }

    return this._dialog.open(DialogFormComponent, dialogConfig);
  }

  private getData() {
    this._residentService.getAllResident().subscribe(
      (data) => {
        this.residents.data = data;
        this._cdr.markForCheck();
      }
    )
  }
}
