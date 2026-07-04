import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm implements OnInit {
  usuario: any = {
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    rolId: null
  };
  roles: any[] = [];
  isEdit: boolean = false;
  loading: boolean = false;
  saving: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarRoles();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cargarUsuario(Number(id));
    }
  }

  cargarRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (res) => {
        this.roles = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando roles', err);
        this.cdr.detectChanges();
      }
    });
  }

  cargarUsuario(id: number): void {
    this.loading = true;
    this.usuarioService.getUsuario(id).subscribe({
      next: (res) => {
        this.usuario = res;
        // Mapear rol si lo tiene
        if (this.usuario.Rols && this.usuario.Rols.length > 0) {
          this.usuario.rolId = this.usuario.Rols[0].rolId;
        }
        this.usuario.password = ''; // Limpiar password por seguridad
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error', err);
        Swal.fire('Error', 'Error al cargar el usuario', 'error');
        this.loading = false;
        this.router.navigate(['/usuario']);
        this.cdr.detectChanges();
      }
    });
  }

  guardar(): void {
    if (!this.usuario.nombre || !this.usuario.email || (!this.isEdit && !this.usuario.password)) {
      Swal.fire('Atención', 'Por favor complete los campos obligatorios', 'warning');
      return;
    }

    this.saving = true;

    // Si es edición y no escribió password, la eliminamos para no pisarla con string vacío
    const dataToSend = { ...this.usuario };
    if (this.isEdit && !dataToSend.password) {
      delete dataToSend.password;
    }

    if (this.isEdit) {
      this.usuarioService.updateUsuario(this.usuario.usuarioId, dataToSend).subscribe({
        next: (res) => {
          this.saving = false;
          this.cdr.detectChanges();
          this.router.navigate(['/usuario']);
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Error al actualizar el usuario', 'error');
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.usuarioService.createUsuario(dataToSend).subscribe({
        next: (res) => {
          if (res.status === '0') {
            Swal.fire('Atención', res.msg, 'warning'); // Ej: Ya existe el email
            this.saving = false;
            this.cdr.detectChanges();
          } else {
            this.saving = false;
            this.cdr.detectChanges();
            this.router.navigate(['/usuario']);
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Error al crear el usuario', 'error');
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuario']);
  }

  eliminar(): void {
    Swal.fire({
      title: '¿Eliminar Usuario?',
      text: '¿Está seguro de eliminar este usuario? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.saving = true;
        this.usuarioService.deleteUsuario(this.usuario.usuarioId).subscribe({
          next: (res) => {
            this.saving = false;
            this.cdr.detectChanges();
            this.router.navigate(['/usuario']);
          },
          error: (err) => {
            console.error('Error eliminando', err);
            Swal.fire('Error', 'Error al eliminar usuario', 'error');
            this.saving = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }
}

