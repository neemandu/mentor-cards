// add-dialog.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// Send
@Component({
  selector: 'app-add-pack-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class addPackDialogComponent implements OnInit{

  createCardsPackForm: FormGroup;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<addPackDialogComponent>) {
    this.createCardsPackForm = this.fb.group({
      id: [null],
      imgUrl: ['', Validators.required],
      description: [null],
      tags: this.fb.array([]),
      categories: this.fb.array([]),
      cards: this.fb.array([]),
      cardsPreview: this.fb.array([]),
      groupsIds: this.fb.array([]),
      guideBook: this.fb.array([]),
      name: [null],
      freeUntilDate: [null],
      about: this.fb.group({
        text: [null],
        imgUrl: [null],
        link: [null]
      }),
      isOwnedByOrg: [null],
      brief: [null],
      likesCounter: [null],
      visitorsCounter: [null],
      backImgUrl: [null],
      isExternalPack: [null],
      authorizedDomains: this.fb.array([]),
      topQuestions: this.fb.array([]),
      usersUsage: this.fb.array([]),
      isFree: [null],
      language: [null],
      isActive: [null],
      guidebookUrl: [null],
      ownerName: [null],
      numberOfCards: [null],
      isHardCopyAvailable: [null],
      videoUrl: [null],
      isReadingGuidebookAMust: [null],
    });
  }

  ngOnInit(): void {}

  get tags() { return this.createCardsPackForm.get('tags') as FormArray; }
  get categories() { return this.createCardsPackForm.get('categories') as FormArray; }
  get cards() { return this.createCardsPackForm.get('cards') as FormArray; }
  get cardsPreview() { return this.createCardsPackForm.get('cardsPreview') as FormArray; }
  get groupsIds() { return this.createCardsPackForm.get('groupsIds') as FormArray; }
  get guideBook() { return this.createCardsPackForm.get('guideBook') as FormArray; }
  get authorizedDomains() { return this.createCardsPackForm.get('authorizedDomains') as FormArray; }
  get topQuestions() { return this.createCardsPackForm.get('topQuestions') as FormArray; }
  get usersUsage() { return this.createCardsPackForm.get('usersUsage') as FormArray; }

  addTag() { this.tags.push(this.fb.control(null)); }
  addCategory() { this.categories.push(this.fb.control(null)); }
  addCard() {
    this.cards.push(this.fb.group({
      categoryName: [null],
      categoryStepNumber: [null],
      cardsImages: this.fb.array([]),
    }));
  }
  addCardsPreview() { this.cardsPreview.push(this.fb.control(null)); }
  addGroupsId() { this.groupsIds.push(this.fb.control(null)); }
  addGuideBookElement() {
    this.guideBook.push(this.fb.group({
      name: [null],
      subElements: this.fb.array([]),
    }));
  }
  addAuthorizedDomain() { this.authorizedDomains.push(this.fb.control(null)); }
  addTopQuestion() { this.topQuestions.push(this.fb.control(null)); }
  addUserUsage() {
    this.usersUsage.push(this.fb.group({
      user: [null],
      entries: [null],
    }));
  }

  onSubmit() {
    if (this.createCardsPackForm.valid) {
      const formData = this.createCardsPackForm.value;
      console.log('Form Data:', formData);
      this.dialogRef.close(formData); 
      // Call the API with formData
    } else {
      console.log('Form is invalid');
    }
  }
}