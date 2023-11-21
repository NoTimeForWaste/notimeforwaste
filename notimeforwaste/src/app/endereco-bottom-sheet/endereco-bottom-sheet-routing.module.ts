import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnderecoBottomSheetPage } from './endereco-bottom-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: EnderecoBottomSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoBottomSheetPageRoutingModule {}
