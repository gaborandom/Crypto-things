import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    if(this.authService.existsToken()){
      this.router.navigateByUrl('/auth/portafolio');
    }
  }


  onRegister(form):void{
    this.authService.register(form.value).subscribe(
      res => {
       
        this.router.navigateByUrl('/auth/portafolio');
      },
      (err) => {
        console.log(err)
        alert(err?.error)
      });
  }
}
