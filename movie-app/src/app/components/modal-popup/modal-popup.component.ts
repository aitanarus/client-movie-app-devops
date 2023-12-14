import { CacheService } from './../../services/cache.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MovieListService } from './../../services/movielist.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { MovieList } from 'src/app/models/movieList';
import { ToastrService } from 'ngx-toastr';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css'],
})
export class ModalPopupComponent {
  public modalRef: NgbModalRef | null = null;

  public closeResult: string | undefined;
  public selectedValue: MovieList | null = null;
  public newListName: string = '';
  public newListDescription: string = '';
  public movieLists: MovieList[] | undefined;

  private user: User | undefined;
  private profile: Profile | undefined;
  private requestResponse: string | undefined;

  private cachedMovieId: string | undefined;

  constructor(
    private modalService: NgbModal,
    private movieListService: MovieListService,
    private profileService: ProfileService,
    private authService: AuthService,
    private cacheService: CacheService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.getLoggedInUser();
    this.getProfile();
    this.cacheService.get<string>('lastVisitedMovieDetailsId', '').subscribe(
      (cachedMovieId: string) => {
        this.cachedMovieId = cachedMovieId;
      },
      (error) => {
        console.error('Error getting cached movieId:', error);
      }
    );
  }

  public getLoggedInUser(): void {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  public getProfile(): void {
    this.profileService.getProfile(this.user?.UserId).subscribe(
      (profile) => {
        console.log('Profile retrieved successfully:', profile);
        this.profile = profile;
      },
      (error) => {
        console.error('Error retrieving profile:', error);
        this.requestResponse = error;
      }
    );
  }

  public open(content: any): void {
    this.getMovieListByProfileId();
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  public close(): void {
    if (this.modalRef) {
      this.modalRef.close('Save click');
      this.modalRef = null;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public onSave(): void {
    if (this.profile) {
      const newMovieList: MovieList = {
        MovieListId: '',
        ListName: this.newListName,
        ListDescription: this.newListDescription,
        MProfileId: this.profile?.ProfileId,
        ImbdIds: [],
      };
      if (!this.selectedValue) {
        this.movieListService.createMovieList(newMovieList).pipe(
          concatMap((createdMovieList) => {
            console.log('Movie list created successfully:', createdMovieList);
            // Add the movie to the movie list
            return this.movieListService.addMovieToMovieList(
              createdMovieList.MovieListId,
              this.cachedMovieId
            );
          })
        ).subscribe(
          (result) => {
            console.log('Movie added to movie list successfully:', result);
            this.requestResponse = 'Movie added to movie list successfully';
            this.toastr.success(this.requestResponse, 'Success');
            this.close();
          },
          (error) => {
            console.error('Error creating movie list:', error);
            this.toastr.error(error, 'Error');
          }
        );
      } else {
        this.movieListService
          .addMovieToMovieList(
            this.selectedValue.MovieListId,
            this.cachedMovieId
          )
          .subscribe(
            (result) => {
              console.log('Movie added to movie list successfully:', result);
              this.requestResponse = 'Movie added to movie list successfully';
              this.toastr.success(this.requestResponse, 'Success');
            },
            (error) => {
              console.error('Error adding movie to movie list:', error);
              this.requestResponse = error.error;
              this.toastr.error(this.requestResponse, 'Error');
            }
          );
      }
    }
  }

  public getMovieListByProfileId(): void {
    if (this.profile) {
      this.movieListService
        .getMovieListByProfileId(this.profile.ProfileId)
        .subscribe(
          (movieLists) => {
            console.log('Movie list created successfully:', movieLists);
            console.error("movie list", this.movieLists);
            this.movieLists = movieLists;
          },
          (error) => {
            console.error('Error creating movie list:', error);
          }
        );
    }
  }
}
