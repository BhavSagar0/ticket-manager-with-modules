import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nthElement'
})
export class NthElementPipe implements PipeTransform {

  transform(array: any[], step: number): any[] {
    return array.filter((_, index) => index % step === 0);
  }

}
