import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit{

  @Input() rating: number = 0;
  @Input() isReadOnly: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.rating === undefined) {
      this.rating = 0;
    }
  }

  public onRateChange(newRating: number) {
    this.rating = newRating;
  }
}
