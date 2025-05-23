import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponCodesManagementComponent } from './coupon-codes-management/coupon-codes-management.component';
import { GuideBookManagementComponent } from './guide-book-management/guide-book-management.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { OrganizationManagementComponent } from './organization-management/organization-management.component';
import { PacksManagementComponent } from './packs-management/packs-management.component';
import { PaymentProgramsManagementComponent } from './payment-programs-management/payment-programs-management.component';
import { ReceiptsManagementComponent } from './receipts-management/receipts-management.component';
import { NewEditCouponDialogComponent } from '../dialogs/new-edit-coupon-dialog/new-edit-coupon-dialog.component';
import { NewEditNewsComponent } from 'src/app/Shared Components/Dialogs/new-edit-news/new-edit-news.component';
import { NewEditOrganizationDialogComponent } from '../dialogs/new-edit-organization/new-edit-organization.component';
import { OrgMembersDialogComponent } from '../dialogs/org-members-dialog/org-members-dialog.component';
import { NewEditReceiptDialogComponent } from '../dialogs/new-edit-receipt-dialog/new-edit-receipt-dialog.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserDialogComponent } from './user-management/edit-dialog/edit-user-dialog.component';
import { addPackDialogComponent } from './packs-management/add-dialog/add-dialog.component';


import { ReceiptItemsPipe } from './receipts-management/receipt-items.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditPackDialogComponent } from './packs-management/edit-dialog/edit-dialog.component';



@NgModule({
  declarations: [
    ReceiptItemsPipe,
    CouponCodesManagementComponent,
    NewsManagementComponent,
    GuideBookManagementComponent,
    OrganizationManagementComponent,
    PacksManagementComponent,
    PaymentProgramsManagementComponent,
    ReceiptsManagementComponent,
    NewEditCouponDialogComponent,
    NewEditNewsComponent,
    OrgMembersDialogComponent,
    NewEditReceiptDialogComponent,
    NewEditOrganizationDialogComponent,
    UserManagementComponent,
    EditUserDialogComponent,
    addPackDialogComponent,
    EditPackDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ManagementModule { }
