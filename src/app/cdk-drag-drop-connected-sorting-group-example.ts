import { Component } from '@angular/core';
import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cdk-drag-drop-connected-sorting-group-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-group-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-group-example.css'],
})
export class CdkDragDropConnectedSortingGroupExample {
  slide = [
    { 'color': 'red', 'type': 'SL', "path": null },
    { 'color': 'green', 'type': 'SL', "path": null },
    { 'color': 'blue', 'type': 'SL', "path": null },
    { 'color': 'Yellow', 'type': 'SL', "path": null },
  ];
  content = [
    { 'name': 'cat', 'type': 'IMG' },
    { 'name': 'partner', 'type': 'IMG' },
    { 'name': 'snow', 'type': 'IMG' },
    { 'name': 'paytm', 'type': 'IMG' }
  ];
  playbook = [];
  dropPlayIndex: number = 0;
  pickIndex: number = 0;
  varSlide: any = {};
  slideTYP: string = '';
  slideCLR: string = '';
  varImage: any = {};
  fileName: string = '';
  colorList: Array<any>= [];
  varPlyBk: any = {};


  OnDrop(event: CdkDragDrop<string[]>) {
    debugger;
    this.dropPlayIndex = event.currentIndex;
    this.pickIndex = event.previousIndex;
    this.varSlide = event.previousContainer.data[this.pickIndex];
    this.slideCLR = this.varSlide.color;
    this.slideTYP = this.varSlide.type;

    if(this.slideTYP === 'SL') {
        if (this.colorList.find(item => item.color === this.slideCLR)) {
          alert('Already Slide is Added');
        } else {
          copyArrayItem(
            event.previousContainer.data, 
            event.container.data, 
            event.previousIndex, 
            event.currentIndex 
          );
          this.colorList.push({
            color: this.slideCLR
          });
        }
    } else if (this.playbook.length === 0 && this.slideTYP === 'IMG') {
        alert("Please Insert Slide First!!!");
        return null;
    } else if (this.playbook.length > 0 && this.slideTYP === 'IMG') {
        this.varImage = event.previousContainer.data[this.pickIndex];
        this.fileName = this.varImage.name;

        if (this.playbook[this.dropPlayIndex]) {
          const playbookList: any = this.playbook.map((element, i) => {
            if (this.dropPlayIndex === i) {
              return { ...(element as {}), path: this.fileName };
            } else {
              return { ...(element as {}) };
            }
          });
          this.playbook = playbookList;
          this.varPlyBk = this.playbook[this.dropPlayIndex];
          this.colorList = this.colorList.filter(item => item.color !==  this.varPlyBk.color)
          // this.colorList = this.colorList.filter(item => item === this.varPlyBk.color);
        }
    } else {
      copyArrayItem (
        event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex 
      );
    } return null;
  }

}

