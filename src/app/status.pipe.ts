import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(picked_up: boolean): string {
    return picked_up ? "RETRIEVED" : "READY FOR PICKUP";
  }

}
