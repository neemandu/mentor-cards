import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditPackDialogComponent implements OnInit {
  createCardsPackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    public dialogRef: MatDialogRef<EditPackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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

  ngOnInit(): void {
    if (this.data) {
      // Populate the form fields
      this.createCardsPackForm.patchValue({
        id: this.data?.id,
        imgUrl: this.data?.imgUrl,
        description: this.data?.description,
        name: this.data?.name,
        freeUntilDate: this.data?.freeUntilDate,
        about: {
          text: this.data?.about?.text,
          imgUrl: this.data?.about?.imgUrl,
          link: this.data?.about?.link
        },
        isOwnedByOrg: this.data?.isOwnedByOrg,
        brief: this.data?.brief,
        likesCounter: this.data?.likesCounter,
        visitorsCounter: this.data?.visitorsCounter,
        backImgUrl: this.data?.backImgUrl,
        isExternalPack: this.data?.isExternalPack,
        isFree: this.data?.isFree,
        language: this.data?.language,
        isActive: this.data?.isActive,
        guidebookUrl: this.data?.guidebookUrl,
        ownerName: this.data?.ownerName,
        numberOfCards: this.data?.numberOfCards,
        isHardCopyAvailable: this.data?.isHardCopyAvailable,
        videoUrl: this.data?.videoUrl,
        isReadingGuidebookAMust: this.data?.isReadingGuidebookAMust,
      });
  
      // Populate form arrays
      this.populateFormArray('tags', this.data?.tags);
      this.populateFormArray('categories', this.data?.categories);
      this.populateFormArray('cardsPreview', this.data?.cardsPreview);
      this.populateFormArray('groupsIds', this.data?.groupsIds);
      this.populateFormArray('authorizedDomains', this.data?.authorizedDomains);
      this.populateFormArray('topQuestions', this.data?.topQuestions);
      this.populateFormArray('usersUsage', this.data?.usersUsage);
  
      // Populate nested form arrays for cards
      this.populateCards(this.data?.cards);
  
      // Populate nested form arrays for guideBook
      this.populateGuideBook(this.data?.guideBook);
      this.populateUsersUsage(this.data?.usersUsage);
    }


  }
  
  populateFormArray(arrayName: string, data: any[]): void {
    const formArray = this.createCardsPackForm.get(arrayName) as FormArray;
    if (data) {
      data.forEach(item => formArray.push(this.fb.control(item)));
    }
  }
  
  populateCards(cards: any[]): void {
    const cardsArray = this.createCardsPackForm.get('cards') as FormArray;
    if (cards) {
      cards.forEach(card => {
        const cardGroup = this.fb.group({
          categoryName: [card.categoryName],
          categoryStepNumber: [card.categoryStepNumber],
          cardsImages: this.fb.array([])
        });
  
        if (card.cardsImages) {
          const cardsImagesArray = cardGroup.get('cardsImages') as FormArray;
          card.cardsImages.forEach(image => {
            cardsImagesArray.push(this.fb.group({
              backImgUrl: [image.backImgUrl],
              frontImgUrl: [image.frontImgUrl]
            }));
          });
        }
  
        cardsArray.push(cardGroup);
      });
    }
  }
  
  populateGuideBook(guideBook: any[]): void {
    const guideBookArray = this.createCardsPackForm.get('guideBook') as FormArray;
    if (guideBook) {
      guideBook.forEach(guide => {
        const guideGroup = this.fb.group({
          name: [guide.name],
          subElements: this.fb.array([])
        });
  
        if (guide.subElements) {
          const subElementsArray = guideGroup.get('subElements') as FormArray;
          guide.subElements.forEach(sub => {
            subElementsArray.push(this.fb.group({
              name: [sub.name]
            }));
          });
        }
  
        guideBookArray.push(guideGroup);
      });
    }
  }
  get tags() { return this.createCardsPackForm.get('tags') as FormArray; }
  get categories() { return this.createCardsPackForm.get('categories') as FormArray; }
  get cards() { return this.createCardsPackForm.get('cards') as FormArray; }
  get cardsPreview() { return this.createCardsPackForm.get('cardsPreview') as FormArray; }
  get groupsIds() { return this.createCardsPackForm.get('groupsIds') as FormArray; }
  get guideBook() { return this.createCardsPackForm.get('guideBook') as FormArray; }
  get authorizedDomains() { return this.createCardsPackForm.get('authorizedDomains') as FormArray; }
  get topQuestions() { return this.createCardsPackForm.get('topQuestions') as FormArray; }
  get usersUsage() { return this.createCardsPackForm.get('usersUsage') as FormArray; }

  addUserUsage() {
    this.usersUsage.push(this.fb.group({
      user: [null, Validators.required],
      entries: [null, Validators.required]
    }));
  }

  removeUserUsage(index: number) {
    this.usersUsage.removeAt(index);
  }

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

  populateUsersUsage(usersUsage: any[]): void {
    const usersUsageFormArray = this.createCardsPackForm.get('usersUsage') as FormArray;
  
    // Clear existing controls in case of updates
    usersUsageFormArray.clear();
  
    usersUsage.forEach(usage => {
      const userGroup = this.fb.group({
        user: [usage.user],  // Wrap in array for FormControl initialization
        entries: [usage.entries]  // Initialize entries as a FormArray
      });
  
      // Populate entries if they exist and are an array
      if (Array.isArray(usage.entries)) {
        const entriesArray = userGroup.get('entries') as FormArray;
        usage.entries.forEach(entry => {
          entriesArray.push(this.fb.control(entry));
        });
      }
  
      usersUsageFormArray.push(userGroup);
    });
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