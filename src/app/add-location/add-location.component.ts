import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PigLocation } from '../pig-location';
import { LocationPipe } from '../location.pipe';
import { LocationService } from '../location.service';

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
    private locationService: LocationService,
    private locationPipe: LocationPipe,
    @Inject(MAT_DIALOG_DATA) data: PigLocation[]) {
    this.locations = data;
    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      longitude: new FormControl('', [
        Validators.required,
        Validators.min(-180),
        Validators.max(180)
      ]),
      latitude: new FormControl('', [
        Validators.required,
        Validators.min(-90),
        Validators.max(90)
      ])
    }
    this.form = new FormGroup(formControls, {validators: [this.duplicateNameValidator]});
  }

  duplicateNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get("name")!.value;
    const locations = this.locations;

    for(let i = 0; i<locations.length; i++) {
      if (name === this.locationPipe.transform(locations[i].key))
            return { duplicateNameValidator: true};
    }
    return null;
  }


  ngOnInit(): void {}


  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit(values: any) {
    console.log(values);
    let newLocation: PigLocation = {
      key: values.name.replaceAll(" ", "_"),
      data: {
        longitude: values.longitude,
        latitude: values.latitude,
        count: 0
      }
    }
    console.log(newLocation);
    this.locationService.addLocation(newLocation);
    this.dialogRef.close();
  }
  
}

