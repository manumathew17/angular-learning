import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSelectionListChange} from '@angular/material/list';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Skill} from '../model/skill';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  empForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  selectedSkills: string[] = [];
  allSkills: string[] = ['Java', 'Angular', 'CSS', 'HTML', 'JavaScript', 'UI', 'SQL', 'React', 'PHP',
    'GIT', 'AWS', 'Python', 'Django', 'C', 'C++', 'C#', 'Unity', 'R', 'AI', 'NLP',
    'Photoshop', 'Nodejs'];

  @ViewChild('skillInput')
  fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor() {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  designations: string[] = ['Developer', 'Manager', 'System Admin', 'Team Lead', 'PM'];
  today = new Date();
  selectedRating: number;


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.allSkills.includes(value) && !this.selectedSkills.includes(value)) {
      this.selectedSkills.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.skillCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedSkills.indexOf(fruit);

    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkills.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  }


  onFormSubmit() {

  }
}
