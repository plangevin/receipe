import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    recipesFirebaseUrl = 'https://ng-recipe-book-ef92e.firebaseio.com/recipes.json';

    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }

    private getAuthUrl(): string {
        const token = this.authService.getToken();
        return this.recipesFirebaseUrl + '?auth=' + token;
    }

    storeRecipes() {
        return this.http.put(this.getAuthUrl(), this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get(this.getAuthUrl()).pipe(
                map(
                    (response: Response) => {
                        const recipes: Recipe[] = response.json();
                        for (const recipe of recipes) {
                            if (!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            ).subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            });
      }
}
