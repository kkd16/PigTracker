import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';

import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
import { AuthenticateService } from '../authenticate.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {
  report: PigReport;
  form: FormGroup;

  correct_password: string = "84892b91ef3bf9d216bbc6e88d74a77c"
  submitted: boolean = false;

  constructor(private dialogRef: MatDialogRef<DeleteComponent>, 
    private pigService: PigService, 
    private locationService: LocationService,
    private router: Router,
    private authenticateService: AuthenticateService,
    @Inject(MAT_DIALOG_DATA) data: PigReport) {
      this.report = data;
    let formControls = {
      password: new FormControl('', [
        Validators.required
      ])
    }
    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {}


  goBack(): void {
    this.dialogRef.close();
  }

  onSubmit(values: any) {

    this.authenticateService.authenticate(values.password).subscribe(ret => {
      if(ret.Digest === this.correct_password) {
        this.locationService.getLocation(this.report.data.location_key).subscribe(location => {
          location.data.count--;
          this.locationService.updateLocation(location).subscribe(()=>{
            this.pigService.deleteReport(this.report.key).subscribe(report => {
              this.report = report;
              this.dialogRef.close();
              this.router.navigate(['/dashboard']);
            });
          })
        })
      } else {
        this.submitted = true;
      }
    });
  }
}
