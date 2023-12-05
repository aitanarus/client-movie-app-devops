import { MovieDetails } from "./movieDetails";
import { Review } from "./review";
import { User } from "./user";

export interface Profile {
    ProfileId: string;
    Picture: string;
    FavoriteMovies: string[]; //imdbID
    Reviews: Review[];
    UserId: string;
}