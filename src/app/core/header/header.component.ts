import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Recipe } from 'src/app/recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

  onSave()  {
    this.dataStorageService.storeRecipes()
      .subscribe((response: Recipe[]) => {
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
