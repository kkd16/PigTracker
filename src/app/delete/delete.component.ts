import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormControl, FormGroup, Validators } from '@angular/forms';

import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {
  report: PigReport | undefined;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private pigService: PigService, private location: Location, private authenticateService: AuthenticateService) {
    let formControls = {
      password: new FormControl('', [
        Validators.required
      ])
    }
    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    this.getReport();
  }

  getReport():void {
    const key = this.route.snapshot.paramMap.get('key');
    this.pigService.getReport(key).subscribe(report => this.report = report);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(values: any) {
    if (this.report && this.authenticateService.authenticate(values.password)) {
      console.log("deleting");
      this.pigService.deleteReport(this.report.key);
    }
  }
}
