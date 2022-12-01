import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
import { AuthenticateService } from '../authenticate.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

  correct_password: string = "84892b91ef3bf9d216bbc6e88d74a77c"
  report: PigReport;
  form: FormGroup;

  submitted: boolean = false;

  constructor(private dialogRef: MatDialogRef<PickupComponent>, 
    private pigService: PigService, 
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

  ngOnInit(): void {
  }

  goBack(): void {
    this.dialogRef.close();
  }

  onSubmit(values: any) {

    this.authenticateService.authenticate(values.password).subscribe(ret => {
      if (ret.Digest === this.correct_password) {
        this.report.data.picked_up = this.report.data.picked_up ? false : true;
        this.pigService.updateReport(this.report).subscribe(() => {
          console.log("Changed Status " + this.report.data.name);
          this.dialogRef.close();
        });
  
      } else {
        this.submitted = true;
      }
    });
  }
}
