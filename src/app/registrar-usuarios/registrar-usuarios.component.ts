import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/interfaces/model/user.models';
import { Departamento } from '../../../core/interfaces/model/departamento.models';
import { Cargo } from '../../../core/interfaces/model/cargo.models';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartamentoService } from '../../../core/services/departamento.service';
import { CargoService } from '../../../core/services/cargo.service';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../core/interfaces/http-response.interface';

@Component({
  selector: 'app-registrar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-usuarios.component.html',
  styleUrl: './registrar-usuarios.component.scss'
})
export class RegistrarUsuariosComponent implements OnInit{

  userForm!: FormGroup;
  static userData: User | null = null;
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];
  isEditMode: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistrarUsuariosComponent>,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private userService: UsuariosService
  ) {
    const user = RegistrarUsuariosComponent.userData;
    this.isEditMode = !!user;
    this.userForm = this.fb.group({
      usuario: [user?.usuario || ''],
      primerNombre: [user?.primerNombre || ''],
      segundoNombre: [user?.segundoNombre || ''],
      primerApellido: [user?.primerApellido || ''],
      segundoApellido: [user?.segundoApellido || ''],
      departamento: [user?.idDepartamento || ''],
      cargo: [user?.idCargo || '']
    });
  }
  ngOnInit(): void {
    this.departamentoService.obtenerTodosDepartamentos().subscribe(
      (response: ApiResponse<Departamento[]>) => {
        if (response && Array.isArray(response.data)) {
          this.departamentos = response.data;
          console.log('Departamentos:', this.departamentos);
        } else {
          console.error('Error: La respuesta de departamentos no es un array.', response);
        }
      },
      (error) => {
        console.error('Error al cargar los departamentos:', error);
      }
    );

    this.cargoService.obtenerTodosCargos().subscribe(
      (response: ApiResponse<Cargo[]>) => {
        if (response && Array.isArray(response.data)) {
          this.cargos = response.data;
          console.log('Cargos:', this.cargos);
        } else {
          console.error('Error: La respuesta de cargos no es un array.', response);
        }
      },
      (error) => {
        console.error('Error al cargar los cargos:', error);
      }
    );
  }
  closeModal() {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.userForm.invalid) {
        console.error('Formulario inválido');
        return;
    }

    const user: User = {
      usuario: this.userForm.value.usuario,
      primerNombre: this.userForm.value.primerNombre,
      segundoNombre: this.userForm.value.segundoNombre,
      primerApellido: this.userForm.value.primerApellido,
      segundoApellido: this.userForm.value.segundoApellido,
      idDepartamento: this.userForm.value.departamento,
      idCargo: this.userForm.value.cargo
    };

    if (this.isEditMode) {
      this.userService.actualizarUsuario(user,RegistrarUsuariosComponent.userData!.id!,).subscribe(
        (response: any) => {
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.userService.crearUsuario(user).subscribe(
        (response: any) => {
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.error('Error al crear usuario:', error);
        }
      );
    }

  }
}
