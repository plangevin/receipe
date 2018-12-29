import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    recipesFirebaseUrl = 'https://ng-recipe-book-ef92e.firebaseio.com/recipes.json';

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    private getAuthUrl(): string {
        const token = this.authService.getToken();
        return this.recipesFirebaseUrl + '?auth=' + token;
    }

    storeRecipes() {
        return this.http.put<Recipe[]>(this.getAuthUrl(), this.recipeService.getRecipes());
    }

    getRecipes() {
       return this.http.get<Recipe[]>(this.getAuthUrl(), { observe: 'response' }).pipe(
                map(
                    (response: HttpResponse<Recipe[]>) => {
                        const recipes: Recipe[] = response.body;
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
