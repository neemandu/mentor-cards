import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-edit-news',
  templateUrl: './new-edit-news.component.html',
  styleUrls: ['./new-edit-news.component.css']
})
export class NewEditNewsComponent implements OnInit {

  newsForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<NewEditNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.newsForm = this.formBuilder.group({
      value: [this.data ? this.data.message : '', [Validators.required]],
    });
  }

  get formControls() { return this.newsForm.controls; }

  saveChanges(): void {
    this.dialogRef.close(this.formControls.value.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
