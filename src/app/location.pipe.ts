import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(input: string): string {
    return input.replaceAll("_", " ");
  }

}
