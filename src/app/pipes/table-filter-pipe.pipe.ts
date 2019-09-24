import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterPipe'
})
export class TableFilterPipePipe implements PipeTransform {
  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter){
      return items;
    }
    if (!Array.isArray(items)) {
      return items;
    }
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return (filter[keyName] === item[keyName]) || !filter[keyName];
          });
        });
    }
  }
}