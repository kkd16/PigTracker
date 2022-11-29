import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  constructor(private pigService: PigService, private router: Router, private location: Location) {
    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      breed: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      pid: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      reporter: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
      ]),
      notes: new FormControl('', [])
    }

    this.form = new FormGroup(formControls, null);
  }
  ngOnInit(): void {}

  onSubmit(values: any) {
    console.log("onSubmit");
    let newReport: PigReport = {
      "key": uuid.v1(),
      "data": {
        "name": values.name,
        "pid": values.pid,
        "breed": values.breed,
        "notes": values.notes,
        "picked_up": false,
        "date": new Date(),
        "reporter": values.reporter,
        "phone": values.phone,
        "location_id": 0
      }
    };

    this.pigService.addReport(newReport);
    this.router.navigate(["/dashboard"]);
  }

  goBack(): void {
    this.location.back();
  }
}
