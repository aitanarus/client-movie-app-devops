import { Component } from '@angular/core';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  profile: Profile = {
    User: {
      UserId: '1',
      Username: 'john_doe',
      Password: 'password123',
      Email: 'john.doe@example.com',
    },
    Picture: 'https://example.com/profile-picture.jpg',
    FavoriteMovies: ['tt123456', 'tt789012', 'tt345678'],
    Reviews: [
      {
        ReviewId: '1',
        imdbID: 'tt123456',
        Author: 'john_doe',
        MovieTitle: 'Star Wars',
        ReviewTitle: 'Good',
        Review:
          'I really enjoyed this movie. It had a great storyline and fantastic acting.',
        Rating: 4,
        PublishedOn: new Date('2023-10-15'),
        UserId: 'user123',
      },
      {
        ReviewId: '2',
        imdbID: 'tt789012',
        Author: 'john_doe',
        MovieTitle: 'Cars',
        ReviewTitle: 'Not bad',
        Review:
          'This film is a must-watch for all movie enthusiasts. Highly recommended!',
        Rating: 5,
        PublishedOn: new Date('2023-11-02'),
        UserId: 'user123',
      },
    ],
  };
}
