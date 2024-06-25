import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permisionGuard } from '../../src/lib/guards/permision.guard'

const routes: Routes = [
  { path: "",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
    pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
