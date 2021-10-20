import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {
  showLogin: boolean
 
  constructor(private router: Router, private authService: AuthService) {
    this.showLogin = !(localStorage.getItem("ACCESS_TOKEN") && localStorage.getItem("USER"))
  }

  ngOnInit(): void {
    console.log(this.showLogin)

  }
  navigateAndLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
