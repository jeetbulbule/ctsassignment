import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { TableFilterPipePipe } from 'src/app/pipes/table-filter-pipe.pipe';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent, TableFilterPipePipe ],
      imports: [BrowserModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onFileSelect() for handling input file button click and test file is of valid type', () => {
    let mockEvent: any = {
      'srcElement': {
        'files': [{'name': 'test.excel'}]
      },
      'target': {}
    };
    component.onFileSelect(mockEvent);
    expect(component.isValidFile).toBeFalsy();
  });
  // it('should call onFileSelect() for handling input file button click for a valid file type', () => {
  //   let mockEvent: any = {
  //     'srcElement': {
  //       'files': [{'name': 'test.csv'}]
  //     },
  //     'target': {'files': [{'name': 'test.csv'}]}
  //   };
  //   component.onFileSelect(mockEvent);
  //   expect(component.isValidFile).toBeTruthy();
  // });
  it('should execute validateFile() for a valid file type', () => {
    let mockFile: any = {
      'name': 'test.csv'
    };
    expect(component.validateFile(mockFile)).toBeTruthy();
  });
  it('should execute validateFile() for an invalid file type', () => {
    let mockFile: any = {
      'name': 'test.excel'
    };
    expect(component.validateFile(mockFile)).toBeFalsy();
  });
  it('should execute getCSVDataRecords() for data transformation', () => {
    let mockRecords: [] = ["First name,Sur name,Issue count,Date of birth","Theo,Jansen,5,1978-01-02T00:00:00","Fiona,de Vries,7,1950-11-12T00:00:00","Petra,Boersma,1,2001-04-20T00:00:00"];
    expect((component.getCSVDataRecords(mockRecords)).length).toEqual(3);
  });
});
