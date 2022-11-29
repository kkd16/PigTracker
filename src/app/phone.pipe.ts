import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(input: string): string {
    return `(${input.slice(0,3)}) ${input.slice(3,6)}-${input.slice(6,10)}`;
  }

}
