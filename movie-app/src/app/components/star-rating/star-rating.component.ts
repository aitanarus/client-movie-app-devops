import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() isReadOnly: boolean = false;
// Output property to emit changes back to the parent component
@Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

// Function to handle changes in the star rating
onRatingChanged(newRating: number): void {
  console.log('New Rating in StarRatingComponent:', newRating);
  this.rating = newRating;
  this.ratingChange.emit(newRating);
}
  constructor() { }

  ngOnInit(): void {
  }

}
