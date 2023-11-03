import { MovieDetails } from "./movieDetails";
import { Review } from "./review";
import { User } from "./user";

export interface Profile {
    User: User;
    Picture: string;
    FavoriteMovies: string[]; //imdbID
    Reviews: Review[];
}