import { Pipe, PipeTransform } from '@angular/core';
import { PigReport } from './pig-report';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  sortLocation(a: PigReport, b: PigReport): number {
    if (a.data.location_key < b.data.location_key)
      return -1;
    if (a.data.location_key > b.data.location_key)
      return 1;
    return 0;
  }

  sortReporter(a: PigReport, b: PigReport): number {
    if (a.data.reporter < b.data.reporter)
      return -1;
    if (a.data.reporter > b.data.reporter)
      return 1;
    return 0;
  }

  sortTime(a: PigReport, b: PigReport): number {
    if (a.data.date < b.data.date)
      return -1;
    if (a.data.date > b.data.date)
      return 1;
    return 0;
  }

  transform(reports: PigReport[], sortBy: number): PigReport[] {
    if (sortBy === 0)
      return reports.sort(this.sortLocation);

    if (sortBy === 1)
      return reports.sort(this.sortReporter);

    if (sortBy === 2)
      return reports.sort(this.sortTime);

    return reports;
  }

}
