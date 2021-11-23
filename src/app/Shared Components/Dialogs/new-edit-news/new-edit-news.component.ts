import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-edit-news',
  templateUrl: './new-edit-news.component.html',
  styleUrls: ['./new-edit-news.component.css']
})
export class NewEditNewsComponent implements OnInit {

  form: FormGroup;


  constructor(public dialogRef: MatDialogRef<NewEditNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: newEditObject, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.form = this.formBuilder.group({
      value: [this.data ?
        this.data.value[this.data.valueFieldName] : '', [Validators.required]],
    });
  }

  get formControls() { return this.form.controls; }

  saveChanges(): void {
    this.dialogRef.close(this.formControls.value.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

export interface newEditObject {
  value: any;
  valueFieldName: string;
}
