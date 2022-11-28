import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  constructor(private pigService: PigService, private router: Router) {
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
        "location_id": 0
      }
    };

    this.pigService.addReport(newReport);
  }
}
