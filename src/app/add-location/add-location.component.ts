import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PigLocation } from '../pig-location';
import { LocationPipe } from '../location.pipe';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
  providers: [ LocationPipe ]
})
export class AddLocationComponent implements OnInit {

  locations: PigLocation[] = [];

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddLocationComponent>,
    private locationPipe: LocationPipe,
    @Inject(MAT_DIALOG_DATA) data: PigLocation[]) {
    this.locations = data;
    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
       // this.duplicateNameValidator
      ]),
      longitude: new FormControl('', [
        Validators.required
      ]),
      latitude: new FormControl('', [
        Validators.required
      ])
    }
    this.form = new FormGroup(formControls, {validators: [this.duplicateNameValidator]});
  }

  duplicateNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get("name")!.value;
    const locations = this.locations;

    for(let i = 0; i<locations.length; i++) {
      if (name === this.locationPipe.transform(locations[i].key))
            return { form_error: "Duplicate name"};
    }
    return null;
  }


  ngOnInit(): void {}


  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit(values: any) {}
}
