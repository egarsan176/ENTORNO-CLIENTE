import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GifsServiceService } from '../gifs/service/gifs-service.service';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent
  ],
  providers:[
    GifsServiceService
  ]
})
export class SharedModule { }
