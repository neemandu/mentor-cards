import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { APIService } from 'src/app/API.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from './edit-dialog/edit-user-dialog.component';


export interface Element {
  id: string;
  username: string;
  email: string;
  phone?: string; 
  status?: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  displayedColumn: string[] = [
    'username',
    'email',
    'phoneNumber',
    'id',
  ];

  userData: any[];
  dataSource: MatTableDataSource<Element>;

  constructor(
    private dialog: MatDialog,
    private apiService: APIService,
    private overlaySpinnerService: OverlaySpinnerService,
  ) { 
    this.overlaySpinnerService.changeOverlaySpinner(false);

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.userData);

    this.getUsers();
  }


  getUsers(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    let nextToken = null;
    let items = [];
    const fetchAllUsers = async () => {
      do {
        console.log('fetching users ...');
        const users = await this.apiService.ListUsers(null, 100, nextToken);
        items = items.concat(users.items);
        nextToken = users.nextToken;
      } while (nextToken);
      this.userData = items;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.sort = this.sort;
      this.overlaySpinnerService.changeOverlaySpinner(false);
        
      (error) => {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        console.log(
          'file: manage-affiliate.component.ts ~ line 42 ~ this.api.ListUsers ~ error',
          error
        );
      }
    }

    fetchAllUsers().catch((reject) => {
      console.log('reject');
      console.log(reject);
      this.overlaySpinnerService.changeOverlaySpinner(false);
      
    });
   
  }

  editItem(id: string) {
    // Find the item to edit based on the provided id
    const item = this.userData.find(item => item.id === id);
    console.log(id, 'id');
    console.log(this.userData, 'userData');
    console.log(item, 'item');
  
    // Open the edit dialog with the item data
    const editDialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '800px',
      height: '600px',
      data: item,
    });
  
    var sub = editDialogRef
      .afterClosed()
      .subscribe((userData: any) => {
        sub.unsubscribe();
        console.log(userData, 'here aff');
        if (userData) {
          this.overlaySpinnerService.changeOverlaySpinner(true);
          if (id != undefined) {
            // Update the user if an id is provided
            this.apiService
              .UpdateUser({
                id: id,
                username: userData.username,
                cancellationDate: userData.cancellationDate,
                fullName: userData.fullName,
                groupId: userData.groupId,
                groupRole: userData.groupRole,
                numberOfPacksSubstitutions: userData.numberOfPacksSubstitutions,
                numberOfPlansSubstitutions: userData.numberOfPlansSubstitutions,
                numberOfUsedPacks: userData.numberOfUsedPacks,
                phone: userData.phone,
                profession: userData.profession,
                providerTransactionId: userData.providerTransactionId,
                status: userData.status              })
              .then(
                (res) => {
                 
                  this.overlaySpinnerService.changeOverlaySpinner(false);
                  this.getUsers();
                },
                (error) => {
                  this.overlaySpinnerService.changeOverlaySpinner(false);
                  console.log(
                    'Error updating user',
                    error
                  );
                }
              );
          }
        }
      });
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}