import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  searchText: string;
  isValidFile: boolean = true;
  records: User[] = null;
  constructor() { }

  ngOnInit() {
  }
  /**
  * Method called on the even of file Upload
  * Post File type validation the file is read to create array for each row
  */
  onFileSelect($event: any): void {
    this.records = null;  // for new upload, old records should be discarded
    let files = $event.srcElement.files;
    let input = $event.target;
    this.isValidFile = this.validateFile(files[0]);
    if (!this.isValidFile) {
      return; // no processing if thefile is not in correct format, .csv in this case
    }
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
      this.records = this.getCSVDataRecords(csvRecordsArray);
    };
  }

  /**
  * Method to validate file type
  */
  validateFile(file: any) {
    return file.name.endsWith(".csv");
  }
  /**
  * Method to convert comma separated objects into a js array to form data model
  */
  getCSVDataRecords(csvRecordsArray: any) {
    let csvArr: User[] = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord && curruntRecord.length > 1) {
        let csvRecord: User = new User();
        csvRecord.firstName = curruntRecord[0].trim();
        csvRecord.lastName = curruntRecord[1].trim();
        csvRecord.issueCount = curruntRecord[2].trim();
        csvRecord.dob = curruntRecord[3].trim();
        csvArr.push(csvRecord);
      }
    }
    csvArr.sort((a, b) => {
      return parseInt(a.issueCount) - parseInt(b.issueCount);
    });
    return csvArr;
  }
}
