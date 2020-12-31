import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ManageMembersService } from 'src/app/services/manage-members.service';
import { User } from 'src/app/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-assign-stock-keepers',
  templateUrl: './assign-stock-keepers.component.html',
  styleUrls: ['./assign-stock-keepers.component.scss']
})
export class AssignStockKeepersComponent implements OnInit {
  skToAssign = [];
  dataSource: MatTableDataSource<User>
  displayedColumns: string[] = ['Check_Boxes', 'First_Name', 'Last_Name'];
  locationsAndUsers: Array<any>;
  panelOpenState: boolean = false;
  allExpandState = false;

  constructor(private manageMembersService: ManageMembersService, private dialog: MatDialog)
  { }

  ngOnInit(): void {
    this.locationsAndUsers = new Array<any>();
    this.skToAssign = [];
    this.manageMembersService.getAllClients()
    .subscribe((user) => {
      const users = user;
      this.populateTable(users);
    });
  }

  populateTable(clients): void {
    clients.forEach(element => {
      if (element.role === 'SK') {
        const obj = this.locationsAndUsers.find(item => item.location === element.location);
        if(obj === undefined) {
          this.locationsAndUsers.push(
          {
            location: element.location,
            users: new Array<User>(element),
          });
        }
        else {
          const index = this.locationsAndUsers.findIndex(item => item.location === element.location);
          this.locationsAndUsers[index].users.push(element);
        }
      }
    });

    this.dataSource = new MatTableDataSource();
    this.locationsAndUsers.forEach(item => {
      item.users.forEach(user => {
        const data = this.dataSource.data;
        data.push(user);
        this.dataSource.data = data;
      });
    });
  }

  // If an Inventory item checkbox is selected then add the id to the list
  onChange(value: any): void {
    if (this.skToAssign.includes(value)) {
      this.skToAssign.splice(
        this.skToAssign.indexOf(value),
        1
      );
    } else {
      this.skToAssign.push(value);
    }
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}