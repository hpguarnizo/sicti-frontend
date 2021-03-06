import {Component, ViewChild,OnInit} from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
//import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {PrincipalPage}  from './pages/principal/principal';
import {PersonaPage} from './pages/persona/persona';
import {ItemPage} from './pages/item/item';
import {InventarioPage} from './pages/inventario/inventario';
import {KitPage} from './pages/kit/kit';
import {PrestamoPage} from './pages/prestamo/prestamo';
import {ReportesPage} from './pages/reportes/reportes';
import {UsuarioPage} from './pages/usuario/usuario';
import {UsuarioAuthService} from '../providers/usuario.auth.service';

import "materialize-css";
import "angular2-materialize";
//import {Storage, LocalStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

import {MaterializeDirective} from "angular2-materialize";
import { NgModule }      from '@angular/core';


@NgModule({
  declarations : [MaterializeDirective],
})




@Component({
  templateUrl: 'app.html',

})


export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  local: Storage = new Storage();
  rootPage: any = LoginPage;

  pages: Array<{title: string, icon: string,component: any}>

  constructor(private platform: Platform,
              private usuarioAuthService: UsuarioAuthService) {

    this.initializeApp();
        // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inventario',icon: 'library_books', component: InventarioPage },
      { title: 'Personas',icon: 'people', component: PersonaPage },
      { title: 'Ítems',icon: 'build', component: ItemPage },
      { title: 'Kits',icon: 'shopping_basket', component: KitPage },
      { title: 'Préstamos',icon: 'swap_horiz', component: PrestamoPage },
      { title: 'Reportes',icon: 'insert_drive_file', component: ReportesPage },
      { title: 'Usuarios',icon: 'account_box', component: UsuarioPage },
      { title: 'Cerrar Sesión',icon: 'power_settings_new', component: LoginPage },

    ];



  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('mobileweb')){
        this.nav.setRoot(PrincipalPage);
      }
      console.log(this.platform.is('mobileweb'))
    });




  }

  openPage(page) {
    this.nav.setRoot(page.component);
    if(page.component == LoginPage) this.usuarioAuthService.logout();
  }
  ngOnInit() {
  }
}
