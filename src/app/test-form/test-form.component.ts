import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITitle } from '../interfaces/title.interface';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit, OnDestroy {

  aareonAngularTest: FormGroup;

  titlesCollection: ITitle[];

  constructor(private fb: FormBuilder, public titleService: TitleService) {
    this.titlesCollection = [];

    this.aareonAngularTest = this.fb.group({
      title: [''],
      name: [''],
      lastName: ['', Validators.required],
      conditions: ['']
    })
  }


  ngOnInit(): void {
    this.titlesSubscription();
  }

  /**
   * @name titlesSort
   * @description
   * Function to sort the incoming titleCollection
   * @returns {*}  {Observable<ITitle[]>}
   * @memberof TestFormComponent
   */
  titlesSort(): Observable<ITitle[]> {
    return this.titleService.getTitles()
      .pipe(
        map((titles: ITitle[]) => {
          this.titlesRemoveObjectByCharacter("!", titles);
          this.patchFormValues(titles);
          return titles.sort((a, b) => a.value.localeCompare(b.value));
        })
      );
  }

  /**
   * @name titlesRemoveObjectByCharacter
   * @description
   * Remove a object by character from collection received
   * @param {string} character
   * @param {ITitle[]} collection
   * @memberof TestFormComponent
   */
  titlesRemoveObjectByCharacter(character: string, collection: ITitle[]): void {
    const characterPosition = collection.findIndex((title => title.value === character));
    collection.splice(characterPosition, 1);
  }

  /**
   * @name titlesSubscription
   * @description
   * Returns the subscription of a titleCollection observable
   * @returns {*}  {Subscription}
   * @memberof TestFormComponent
   */
  titlesSubscription(): Subscription {
    return this.titlesSort().subscribe((titleData: ITitle[]) => this.titlesCollection = titleData);
  }

  /**
   * @name sendFormData
   * @description
   * Function to submit data in case that the form is valid
   * @memberof TestFormComponent
   */
  sendFormData() {
    if (this.aareonAngularTest.valid) console.log(this.aareonAngularTest.value);
  }

  /**
   * @name patchFormValues
   * TODO: improve function naming or params inc
   * @description
   * path the value of the form to set default values for title in this case
   * @param {ITitle[]} collection
   * @memberof TestFormComponent
   */
  patchFormValues(collection: ITitle[]) {
    const selectedPosition = collection.findIndex((title => title.default === true))
    this.formGetValue('title')?.setValue(collection[selectedPosition].id);
  }

  /**
   * @name buttonState
   * @description
   * Returns if the conditions input has value or not 
   * @returns {*}  {boolean}
   * @memberof TestFormComponent
   */
  buttonState(): boolean {
    return !this.formGetValue('conditions')?.value;
  }

  /**
   * @name formGetValue
   * @description
   * Returns the value of incoming input name
   * @param {string} name
   * @returns {*}  {(AbstractControl | null)}
   * @memberof TestFormComponent
   */
  formGetValue(name: string): AbstractControl | null {
    return this.aareonAngularTest.get(name);
  }

  ngOnDestroy(): void {
    this.titlesSubscription().unsubscribe();
  }

}
