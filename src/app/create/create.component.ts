import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
import * as uuid from 'uuid';
import { PigLocation } from '../pig-location';
import { LocationService } from '../location.service';
import { AddLocationComponent } from '../add-location/add-location.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public locations: PigLocation[] = [];

  form: FormGroup;
  constructor(private pigService: PigService, 
    private router: Router, 
    private location: Location, 
    private locationService: LocationService,
    public dialog: MatDialog) {
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
      location_key: new FormControl('', [
        Validators.required
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
  ngOnInit(): void {
    this.refreshLocations();
  }

  refreshLocations(): void {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  onSubmit(values: any) {
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
        "location_key": values.location_key
      }
    };

    this.pigService.addReport(newReport).subscribe(report => {
      console.log(report);
      this.locationService.getLocation(report.data.location_key).subscribe(location => {
        location.data.count++;
        this.locationService.updateLocation(location).subscribe(()=>{
          this.router.navigate(["/dashboard"])
        })
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  newLocation(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '700px';
    dialogConfig.width = '700px';
    dialogConfig.position = {
      'top': '100px',
      left: '150px'
    }
    dialogConfig.data = this.locations;

    this.dialog.open(AddLocationComponent, dialogConfig).afterClosed().subscribe(() => {
      this.refreshLocations();
    });
  }
}
