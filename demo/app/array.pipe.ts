import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    if (!value) return value;

    const retVal = [];

    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        retVal.push({ 'key': key, 'value': value[key] });
      }
    }

    return retVal;
  }
}
