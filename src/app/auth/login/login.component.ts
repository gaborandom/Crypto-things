import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.authService.existsToken()){
      this.router.navigateByUrl('/auth/portafolio');
    }
  }

  onLogin(form):void{
    this.authService.login(form.value).subscribe(
      res => {
        console.log(res)
        this.router.navigateByUrl('/auth/portafolio');
      },
      (err) => {
        console.log(err)
        alert(err?.error?.message)
      });
  }

}
