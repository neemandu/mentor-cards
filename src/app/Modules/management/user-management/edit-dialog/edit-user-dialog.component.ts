import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateUserInput } from 'src/app/API.service';


@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: [''],
      phone: [''],
      status: [''],
      numberOfPacksSubstitutions: [0],
      lastPackSubstitutionDate: [''],
      numberOfPlansSubstitutions: [0],
      lastPlanSubstitutionDate: [''],
      firstProgramRegistrationDate: [''],
      groupId: [''],
      numberOfUsedPacks: [0],
      groupRole: [''],
      cancellationDate: [''],
      providerTransactionId: [''],
      fullName: [''],
      createdAt: [''],
      updatedAt: [''],
      entries: [0],
      refId: [''],
      profession: [''],
      AithreadId: [''],
      userOrgMembershipId: [null],
      userMyAffiliateId: [null],
      couponCodes: this.fb.array([]),
      entryDates: this.fb.array([])  ,
      cardsPacksIds: this.fb.array([]),
      favouritePacks: this.fb.array([]),
      externalPacksSubscriptions: this.fb.array([]),
      AiConversations: this.fb.array([]),
      payments: this.fb.array([]),
      subscription: this.fb.group({
        id: [''],
        startDate: [''],
        paymentProvider: [''],
        providerTransactionId: [''],
        cancellationDate: [''],
        nextBillingDate: ['']
      })
    });
  }

  ngOnInit(): void {
    // Patch simple fields
    this.userForm.patchValue({
      id: this.data?.id,
      email: this.data?.email,
      username: this.data?.username,
      phone: this.data?.phone,
      status: this.data?.status,
      subscription: this.data?.subscription,
      numberOfPacksSubstitutions: this.data?.numberOfPacksSubstitutions,
      lastPackSubstitutionDate: this.formatDate(this.data?.lastPackSubstitutionDate),
      numberOfPlansSubstitutions: this.data?.numberOfPlansSubstitutions,
      lastPlanSubstitutionDate: this.formatDate(this.data?.lastPlanSubstitutionDate),
      firstProgramRegistrationDate: this.formatDate(this.data?.firstProgramRegistrationDate),
      groupId: this.data?.groupId,
      numberOfUsedPacks: this.data?.numberOfUsedPacks,
      groupRole: this.data?.groupRole,
      cancellationDate: this.formatDate(this.data?.cancellationDate) ,
      providerTransactionId: this.data?.providerTransactionId,
      fullName: this.data?.fullName,
      createdAt: this.data?.createdAt,
      updatedAt: this.data?.updatedAt,
      entries: this.data?.entries,
      refId: this.data?.refId,
      orgMembership: null,
      myAffiliate: null,
      profession: this.data?.profession,
      AithreadId: this.data?.AithreadId,
    });
  
    // Initialize FormArray fields
    if (this.data?.couponCodes) {
      this.data?.couponCodes.forEach(code => this.couponCodes.push(this.fb.control(code)));
    }
  
    if (this.data?.cardsPacksIds) {
      this.data?.cardsPacksIds.forEach(id => this.cardsPacksIds.push(this.fb.control(id)));
    }
  
    if (this.data?.favouritePacks) {
      this.data?.favouritePacks.forEach(pack => this.favouritePacks.push(this.fb.control(pack)));
    }

    if (this.data?.entryDates) {
      this.data?.entryDates.forEach(date => this.entryDates.push(this.fb.control(this.formatDate(date))));
    }
  
    if (this.data?.externalPacksSubscriptions) {
      this.data?.externalPacksSubscriptions.forEach(subscription => 
        this.externalPacksSubscriptions.push(this.fb.group({
          id: [subscription?.id || ''],
          date: [this.formatDate(subscription?.date) || '']
        }))
      );
    }

    if (this.data?.AiConversations) {
      this.data?.AiConversations.forEach((conversation: any, index: number) => {
        console.log('Initializing conversation:', conversation);
        this.AiConversations.push(this.fb.group({
          question: [conversation?.question || ''],
          answer: [conversation?.answer || ''],
          date: [this.formatDate(conversation?.date) || '']
        }));
      });
    }
  
    if (this.data?.payments) {
      this.data?.payments.forEach(payment => 
        this.payments?.push(this.fb.group({
          id: [payment?.id || ''],
          date: [payment?.date || ''],
          payedMonths: [payment?.payedMonths || 0],
          amount: [payment?.amount || 0],
          currency: [payment?.currency || ''],
          paymentWay: [payment?.paymentWay || ''],
          transactionId: [payment?.transactionId || ''],
        }))
      );
    }

    // Initialize with data if available
    if (this.data?.couponCodes) {
    this.data?.couponCodes.forEach((code: any) => {
      this.couponCodes.push(this.fb.group({
        allowedCardsPacks: [code?.allowedCardsPacks],
        couponCode: [code?.couponCode],
        createdAt: [code?.createdAt],
        discount: [code?.discount],
        id: [code?.id],
        organization: [code?.organization],
        trialPeriodInDays: [code?.trialPeriodInDays],
        updatedAt: [code?.updatedAt]
      }));
    });

  }

  if (this.data) {
    this.userForm.patchValue({
      id: this.data.id,
      startDate: this.formatDate(this.data?.startDate),
      paymentProvider: this.data?.paymentProvider,
      providerTransactionId: this.data?.providerTransactionId,
      cancellationDate: this.formatDate(this.data?.cancellationDate),
      nextBillingDate: this.formatDate(this.data?.nextBillingDate) || ''
    });
  }

}
  
  
formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
}


get couponCodes(): FormArray {
  return this.userForm?.get('couponCodes') as FormArray;
}

get cardsPacksIds(): FormArray {
  return this.userForm?.get('cardsPacksIds') as FormArray;
}

get entryDates(): FormArray {
  return this.userForm?.get('entryDates') as FormArray;
}

get favouritePacks(): FormArray {
  return this.userForm?.get('favouritePacks') as FormArray;
}

get externalPacksSubscriptions(): FormArray {
  return this.userForm?.get('externalPacksSubscriptions') as FormArray;
}

get payments(): FormArray {
  return this.userForm?.get('payments') as FormArray;
}

get AiConversations(): FormArray {
  return this.userForm?.get('AiConversations') as FormArray;
}


addCouponCode(): void {
  this.couponCodes.push(this.fb.group({
    allowedCardsPacks: [null],
    couponCode: [''],
    createdAt: [''],
    discount: [0],
    id: [''],
    organization: [null],
    trialPeriodInDays: [0],
    updatedAt: ['']
  }));
}


removeCouponCode(index: number): void {
  this.couponCodes.removeAt(index);
}


addCardPackId(): void {
  this.cardsPacksIds.push(this.fb.control(''));
}


removeCardPackId(index: number): void {
  this.cardsPacksIds.removeAt(index);
}


addFavouritePack(): void {
  this.favouritePacks.push(this.fb.control(''));
}


removeFavouritePack(index: number): void {
  this.favouritePacks.removeAt(index);
}


addExternalPackSubscription(): void {
  this.externalPacksSubscriptions.push(this.fb.group({
    id: [''],
    date: ['']
  }));
}


removeExternalPackSubscription(index: number): void {
  this.externalPacksSubscriptions.removeAt(index);
}


addAiConversion(): void {
  this.AiConversations.push(this.fb.group({
    question: [''],  
    answer: [''],
    date: ['']
  }));
}


removeAiConversion(index: number): void {
  this.AiConversations.removeAt(index);
}


addEntryDate(): void {
  this.entryDates.push(this.fb.control(''));
}


removeEntryDate(index: number): void {
  this.entryDates.removeAt(index);
}


addPayment(): void {
  this.payments.push(this.fb.group({
    id: [''],
    date: [''],
    payedMonths: [0],
    amount: [0],
    currency: [''],
    paymentWay: [''],
    transactionId: ['']
  }));
}


removePayment(index: number): void {
  this.payments.removeAt(index);
}
  

save(): void {
  
  if (this.userForm.valid) {
      const formData = this.userForm.value;

      // Function to format dates
      const formatDate = (dateString: string | null): string | null => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date.toISOString();
      };

      const filteredData: UpdateUserInput = {
        id: formData?.id || '',
        username: formData?.username || null,
        phone: formData?.phone || null,
        status: formData?.status || null,
        numberOfPacksSubstitutions: formData?.numberOfPacksSubstitutions || null,
        numberOfPlansSubstitutions: formData?.numberOfPlansSubstitutions || null,
        groupId: formData?.groupId || null,
        numberOfUsedPacks: formData?.numberOfUsedPacks || null,
        groupRole: formData?.groupRole || null,
        cancellationDate: formatDate(formData?.cancellationDate),
        providerTransactionId: formData?.providerTransactionId || null,
        fullName: formData?.fullName || null,
        profession: formData?.profession || null,
        userOrgMembershipId: formData?.userOrgMembershipId || null,
        userMyAffiliateId: formData?.userMyAffiliateId || null
      };

      this.dialogRef.close(filteredData);
    } else {
      console.error('Form is invalid');
    }
  }
  
}
