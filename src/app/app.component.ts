import {Component, Input, ViewChild} from '@angular/core';
import {VirtualScrollComponent} from 'angular2-virtual-scroll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() items;
  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;


  //----------------------- Type One -----------------------//
  public itemsArrayTypeOne = [];
  public initialItemCountTypeOne: any = 50;
  public totalItemCountTypeOne: any = 100;
  public itemActivePage: any = 1;

  public flagTypeOne: any = true;
  public loadMoreFirstEventDetail: any = {};

  //Paginate Config
  public paginateConfigTypeOne = {
    itemsPerPage: this.totalItemCountTypeOne,
    //Paginate Level Link
    totalItems: 500,
    currentPage: 1
  };

  //----------------------- Type Two -----------------------//
  public itemsArrayTypeTwo = [];
  public currentPageTypeTwo: any = 1;
  public initialItemCountTypeTwo: any = 50;
  public totalItemCountTypeTwo: any = 500;


  //----------------------- Type Three -----------------------//
  public itemsArrayTypeThree = [];
  public initialItemCountTypeThree: any = 50;


  //----------------------- Type One [Scroll With Paginate ]-----------------------//

  pageChangedTypeOne(event) {
    this.itemsArrayTypeOne = [];
    setTimeout(() => {
      this.itemsArrayTypeOne = [];
      for (let i = 0; i < 50; i++) {
        this.itemsArrayTypeOne.push({
          name: 'page :' + this.paginateConfigTypeOne.currentPage + ', item-count=' + i
        });
      }
      this.itemActivePage = event.page;
      this.virtualScroll.refresh();
      this.initialItemCountTypeOne = 50;
    }, 200)
  }

  loadMoreTypeOne($event) {
    if (this.flagTypeOne) {
      this.loadMoreFirstEventDetail = $event;
      this.flagTypeOne = false;
    }
    //Forward Scroll
    if ($event.end === this.initialItemCountTypeOne) {
      //Lazy API Fetch Here
      if (this.totalItemCountTypeOne > $event.end) {
        for (let i = this.initialItemCountTypeOne; i < this.initialItemCountTypeOne + 10; i++) {
          this.itemsArrayTypeOne.push({
            name: 'page :' + this.paginateConfigTypeOne.currentPage + ', item-count=' + i
          });
        }
        this.initialItemCountTypeOne = this.initialItemCountTypeOne + 10;
      }
      else {
        //Load Next Page
        this.itemsArrayTypeOne = [];
        setTimeout(() => {
          this.itemsArrayTypeOne = [];
          this.itemActivePage = this.itemActivePage + 1;
          this.initialItemCountTypeOne = 50;
          //Changing CurrentPage Will Invoke pageChangedTypeOne()
          this.paginateConfigTypeOne.currentPage = this.itemActivePage;
        }, 100)
      }
    }
    //Backward Scroll
    if ($event.start === this.loadMoreFirstEventDetail.start && $event.end === (this.loadMoreFirstEventDetail.end - 1)) {
      this.itemActivePage = this.itemActivePage ? this.itemActivePage - 1 : null;
      if (this.itemActivePage) {
        this.itemsArrayTypeOne = [];
      }
      setTimeout(() => {
        if (this.itemActivePage) {
          this.itemsArrayTypeOne = [];
          this.initialItemCountTypeOne = 50;
          //Changing CurrentPage Will Invoke pageChangedTypeOne()
          this.paginateConfigTypeOne.currentPage = this.itemActivePage;
        }
      }, 100)
    }
  }

  //----------------------- Type Two [Next/Previous]-----------------------//

  loadMoreTypeTwo($event) {
    if ($event.end === this.initialItemCountTypeTwo) {
      if (this.totalItemCountTypeTwo > $event.end) {
        for (let i = this.initialItemCountTypeTwo; i < this.initialItemCountTypeTwo + 10; i++) {
          this.itemsArrayTypeTwo.push({name: 'page :' + this.currentPageTypeTwo + ', item-count=' + i});
        }
        this.initialItemCountTypeTwo = this.initialItemCountTypeTwo + 10;
      }
    }
  }

  next() {
    this.itemsArrayTypeTwo = [];
    this.initialItemCountTypeTwo = 50;
    setTimeout(() => {
      this.itemsArrayTypeTwo = [];
      this.currentPageTypeTwo = this.currentPageTypeTwo + 1;
      for (let i = 0; i < this.initialItemCountTypeTwo; i++) {
        this.itemsArrayTypeTwo.push({name: 'page :' + this.currentPageTypeTwo + ', item-count=' + i});
      }
    }, 200);
  }

  previous() {
    this.itemsArrayTypeTwo = [];
    this.initialItemCountTypeTwo = 50;
    setTimeout(() => {
      this.itemsArrayTypeTwo = [];
      this.currentPageTypeTwo = this.currentPageTypeTwo - 1;
      for (let i = 0; i < this.initialItemCountTypeTwo; i++) {
        this.itemsArrayTypeTwo.push({name: 'page :' + this.currentPageTypeTwo + ', item-count=' + i});
      }
    }, 200);
  }

  //----------------------- Type Three [Infinite]-----------------------//

  loadMoreTypeThree($event) {
    if ($event.end === this.initialItemCountTypeThree) {
      for (let i = this.initialItemCountTypeThree; i < this.initialItemCountTypeThree + 100; i++) {
        this.itemsArrayTypeThree.push({name: 'item-count=' + i});
      }
      this.initialItemCountTypeThree = this.initialItemCountTypeThree + 100;
    }
  }

  ngOnInit() {
    //Type One
    for (let i = 0; i < this.initialItemCountTypeOne; i++) {
      this.itemsArrayTypeOne.push({
        name: 'page :' + this.paginateConfigTypeOne.currentPage + ', item-count=' + i
      });
    }

    //Type Two
    for (let i = 0; i < this.initialItemCountTypeTwo; i++) {
      this.itemsArrayTypeTwo.push({
        name: 'page :' + this.currentPageTypeTwo + ', item-count=' + i
      });
    }

    //Type Three
    for (let i = 0; i < this.initialItemCountTypeThree; i++) {
      this.itemsArrayTypeThree.push({
        name: 'item-count=' + i
      });
    }
  }

}
