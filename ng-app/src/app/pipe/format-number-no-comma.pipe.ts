import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumberNoComma'
})
export class FormatNumberNoCommaPipe implements PipeTransform {

  transform(value: number): string {
    let formattedValue: string = '';
    if(value !== undefined && value !== null) {
      formattedValue = value.toString().replace(/,/g, "");
    }

    return formattedValue;
  }

}
