import { MovieList } from "./movieList";
import { Review } from "./review";

export interface Profile {
    ProfileId: string;
    Picture: File | string;
    MovieLists: MovieList[]; 
    Reviews: Review[];
    UserId: string;
}