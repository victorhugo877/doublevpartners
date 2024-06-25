import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppFacade } from '../+state/app.facade';
import { UsersService } from 'src/lib/services/users/users.service';
import { Alert } from 'src/lib/models/alert.model';
import { catchError, forkJoin, map } from 'rxjs';
import { DATA_INIT_USER, FilterUsers, Item, Users } from 'src/lib/models/users.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  formUsers!: FormGroup;
  alertShow:boolean = false;
  alertView:Alert = {
    type: "Sucess",
    message: "Usuarios registrado de manera Exitosa!!"
  }
  users:Item[]=[DATA_INIT_USER];
  userSearch:string = 'YOUR_NAME';
  filters:FilterUsers = {
    q: '',
    page: 1,
    per_page:10
  };
  page:number =1;
  per_page:number =  10;
  wordNotValid:boolean = false;
  followersUsers:any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private userService:UsersService,
    private spinner: NgxSpinnerService,
    readonly appFacade:AppFacade
  ){
    this.initialForm();
  }

  ngOnInit() {
    // this.paginator.page.subscribe((event: PageEvent) => {
    //   this.page = event.pageIndex;
    //   this.per_page = event.pageSize;
      
    // });
    this.getUsers();
  }


  initialForm():void {
    this.formUsers = new FormGroup({
      user: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  getUsers():void{
    this.spinner.show();
    this.filters = {
      ...this.filters,
      q: this.userSearch,
      page: this.page,
      per_page: this.per_page
    };
    this.userService.getUSers(this.filters)
      .pipe(
        catchError((e) => {
          this.users = [DATA_INIT_USER];
          this.alertShow=true;
          this.spinner.hide();
          this.alertView = {
            type: 'danger',
            message: 'Ha ocurrido un error No es posible registrase, intentelo mas tarde',
          }
          throw e;
        })
      )
      .subscribe((data:Users):void => {
        this.users = data?.items;
        this.spinner.hide();
        this.followers()
      })
    }

  close():void {
    this.alertShow=false;
  }

  welcome():void {
    this.router.navigate(["/todo"]);
  }

  searchUser():void {
    this.userSearch = this.formUsers?.value?.user;
    this.getUsers();
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.per_page = event.pageSize;
    this.getUsers();
  }

  goToPerfil(user:any): void {
    window.open(`${environment.userGitHub}${user}`, '_blank');
  }

  ngAfterViewInit(): void {
    this.formUsers.valueChanges.subscribe((p) => {
      this.wordNotValid = false; 
      const valor = p?.user?.toLowerCase();
      if (valor.includes('doublevpartners')) {
        this.alertView = {
          type: 'danger',
          message: 'Palabra doublevpartners No valida',
        }
        this.alertShow=true;
        this.wordNotValid = true;
      }
      this.changeDetector.markForCheck();
    });
  }

  followers():void {
    const observables = this.users.map((user: Item) =>
      this.userService.getFollowersUsers(user?.login).pipe(
        map((data: any[]) => ({
          follow: data.length,
          login: user.login,
          id: user.id
        }))
      )
    );
    forkJoin(observables).subscribe(
      (results: any[]) => {
        this.followersUsers = results;
        this.appFacade.setFollowersUser(this.followersUsers)
      },
      (error) => {
        console.error('Error al obtener los seguidores:', error);
      }
    );
  }
}
