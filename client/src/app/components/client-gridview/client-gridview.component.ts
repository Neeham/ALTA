import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ManageMembersService } from 'src/app/services/manage-members.service';
import roles from 'src/app/fixtures/roles.json';

@Component({
  selector: 'app-client-gridview',
  templateUrl: './client-gridview.component.html',
  styleUrls: ['./client-gridview.component.scss'],
})
export class ClientGridviewComponent implements OnInit {
  view = 'Client Gridview';
  users: Array<User>;

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'First_Name',
    'Last_Name',
    'Status',
    'Settings',
  ];
  roles = roles;
  filterTerm: string;
  selected = 'All';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private manageMembersService: ManageMembersService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.users = new Array<User>();
    this.manageMembersService.getAllClients().subscribe((user) => {
      const users = user;
      this.populateTable(users);
    });
  }

  ngOnInit(): void {}

  applyFilter(filterTerm: string): void {
    this.dataSource.filter = filterTerm;
  }

  populateTable(clients): void {
    if (clients[0].role !== 'SA') {
      this.displayedColumns = [
        'First_Name',
        'Last_Name',
        'Role',
        'Location',
        'Status',
        'Settings',
      ];
    }
    clients.forEach((element) => {
      const obj = this.roles.find((o) => o.abbrev === element.role);
      element.role = obj.name;
      this.users.push(element);
    });
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Rows per page:';
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
  }
}
