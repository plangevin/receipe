import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

  onSave()  {
    this.dataStorageService.storeRecipes()
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  onFetch() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
