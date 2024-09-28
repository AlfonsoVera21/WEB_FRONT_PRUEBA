import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { User } from '../../../core/interfaces/model/user.models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Departamento } from '../../../core/interfaces/model/departamento.models';
import { Cargo } from '../../../core/interfaces/model/cargo.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RegistrarUsuariosComponent } from '../registrar-usuarios/registrar-usuarios.component';
import { ConfirmarDialogoComponent } from '../confirmar-dialogo/confirmar-dialogo.component';
import { CargoService } from '../../../core/services/cargo.service';
import { DepartamentoService } from '../../../core/services/departamento.service';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatIconModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss'
})
export class ListarUsuariosComponent implements OnInit{
  users: User[] = [];
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];
  departamentosName: { [key: number]: string } = {};
  cargosName: { [key: number]: string } = {};
  filteredUsers: User[] = [];
  isEditing: boolean = false;
  selectedUser: User | null = null;
  userForm!:FormGroup;
  totalRecords: number = 0;

  constructor(
    private usuarioService: UsuariosService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.obtenerUsuarios();
    this.loadDepartamentos();
    this.loadCargos();
    this.userForm = this.fb.group({
      id: '',
      username: '',
      nombre: '',
      apellido: '' ,
      departamento: '',
      cargo: '',
      email: '',
    });
  }

  obtenerUsuarios(){
    this.usuarioService.obtenerTodosUsuarios().subscribe({
      next: resp =>{
        this.users = resp.data;
        this.totalRecords = this.users.length;
        console.log(this.users);
      }
    })
  }

  openModal(user?: User): void {
    // Log para verificar el valor del usuario y su id
    console.log('Usuario a editar:', user);
    console.log('ID del usuario:', user?.id);

    RegistrarUsuariosComponent.userData = user || null;
    const dialogRef = this.dialog.open(RegistrarUsuariosComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerUsuarios();
    });
  }
  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmarDialogoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.eliminarUsuario(user.id!).subscribe(
          () => {
            this.users = this.users.filter(u => u.id !== user.id);
            console.log('Usuario eliminado con éxito');
          },
          (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        );
      }
    });
  }
  onDepartamentoChange(event: Event) {
    const selectedDepartamentoId = +(event.target as HTMLSelectElement).value;
    if (selectedDepartamentoId) {
      this.filteredUsers = this.users.filter(user => user.idDepartamento === selectedDepartamentoId);
    } else {
      this.filteredUsers = [...this.users];
    }
  }
  onCargoChange(event: Event) {
    const selectedCargoId = +(event.target as HTMLSelectElement).value;
    if (selectedCargoId) {
      this.filteredUsers = this.users.filter(user => user.idCargo === selectedCargoId);
    } else {
      this.filteredUsers = [...this.users];
    }
  }
  onSubmit() {
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
  createUser() {
    const newUser: User = this.userForm.value;
    this.usuarioService.crearUsuario(newUser).subscribe(
      (response) => {
        this.users.push(response.data);
        this.userForm.reset();
        Swal.fire('Usuario creado', 'El usuario ha sido registrado con éxito', 'success');
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  updateUser() {
    if (this.selectedUser) {
      const updatedUser: User = this.userForm.value;
      this.usuarioService.actualizarUsuario(updatedUser,this.selectedUser.id!).subscribe(
        (response) => {
          const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
          this.users[index] = response.data;
          this.userForm.reset();
          this.isEditing = false;
          this.selectedUser = null;
          Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado con éxito', 'success');
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    }
  }
  cancelEdit() {
    this.userForm.reset();
    this.isEditing = false;
    this.selectedUser = null;
  }
  loadDepartamentos(): void {
    this.users.forEach(user => {
      this.departamentoService.obtenerDepartamentoPorId(user.idDepartamento).subscribe(departamento => {
        this.departamentosName[user.idDepartamento] = departamento.data.nombre;
      });
    });
  }

  loadCargos(): void {
    this.users.forEach(user => {
      this.cargoService.obtenerCargoPorId(user.idCargo).subscribe(cargo => {
        this.cargosName[user.idCargo] = cargo.data.nombre;
      });
    });
  }

  getDepartamentoNombre(idDepartamento: number): string {
    return this.departamentosName[idDepartamento] || 'No encontrado';
  }

  getCargoNombre(idCargo: number): string {
    return this.cargosName[idCargo] || 'No encontrado';
  }
  removeAccents(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
