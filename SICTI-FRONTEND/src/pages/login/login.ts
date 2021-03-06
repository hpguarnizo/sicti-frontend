import {Component, Input, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
//import {PrincipalPage} from '../principal/principal';
import {InventarioPage} from '../inventario/inventario';
import {Usuario} from '../usuario/usuario.model';
import {UsuarioAuthService} from '../../providers/usuario.auth.service';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
//import {FORM_DIRECTIVES} from '@angular2/common';
//import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Url} from '../../url';
import { ToastController } from 'ionic-angular';
import 'materialize-css/js/materialize.js';

import {MaterializeDirective} from "angular2-materialize";

import { NgModule }      from '@angular/core';


@Component({
    templateUrl: 'login.html',
    providers: [UsuarioAuthService,],

})

@NgModule({
  declarations : [MaterializeDirective],
})

export class LoginPage implements OnInit {
    @Input()
    usuario = {
        usuario: '',
        clave: ''
    };
    url = new Url();
    usuarios: Usuario[];

    errores = {
        auth: '',
    };
    local: Storage = new Storage();
    constructor(private http: Http,
        private nav: NavController,
        private usuarioAuthService: UsuarioAuthService,
      public toastCtrl: ToastController) {}

    setUsuario(usuario: string, clave: string) {
        this.usuario.usuario = usuario;
        this.usuario.clave = clave;
    }

    login() {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept','application/json')
        this.http.post(this.url.base + this.url.token, JSON.stringify({username: this.usuario.usuario,password: this.usuario.clave }), { headers: headers })
            .map(res => res)
            .subscribe(
            data => this.authSuccess(data),
            err => {this.errores.auth = "Usuario o clave incorrectos";
                    console.log(err)}
            );
    }

    authSuccess(data) {
        console.log(data .token)
        this.nav.setRoot(InventarioPage);
        this.errores.auth = null;
        //this.local.setJson('auth',{token: data .token});
        this.local.set('auth',data.stringify().token);
        this.presentToast("Acceso exitoso")

    }
    ngOnInit() {
        this.usuarioAuthService.isAuthenticated().then(result => {
            if (result) this.nav.setRoot(InventarioPage);
        });
    }

    presentToast(text : string) {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }



}
