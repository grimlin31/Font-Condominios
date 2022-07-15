import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserInterface } from "../../../share/model/user.interface";
import { ResidentService } from "../../../share/service/resident/resident.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogDataInterface } from "../../../share/model/dialog-data.interface";
import { DialogFormComponent } from "../../../share/feature/dialog-form/dialog-form.component";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
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

  public printData(value: any) {
    console.log(value)
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
            (value) => {
              this.getData()
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
              this.getData();
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
                this.getData();
              }
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
      (value) => {
        this.residents.data = [...value];
      },
    )
  }
}
