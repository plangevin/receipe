import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeDetailResolve implements Resolve<Recipe> {

    constructor(private recipeService: RecipeService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
        const id = +route.params['id'];
        const recipe = this.recipeService.getRecipe(id);

        if (recipe) {
            return recipe;
        }

        this.router.navigate(['/recipes']);
        return null;
    }
}
