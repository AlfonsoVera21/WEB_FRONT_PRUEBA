import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListarUsuariosComponent } from "./listar-usuarios/listar-usuarios.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListarUsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WEB_FRONT_PRUEBA';
}
