import { ResultComponent } from './components/result/result.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinderComponent } from './components/finder/finder.component';

const routes: Routes = [
  {
    path: '',
    component: FinderComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
