import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prueba'
})
export class PruebaPipe implements PipeTransform {

  transform(value: string): string {
    return "sr. " + value + " ";
  }
}
