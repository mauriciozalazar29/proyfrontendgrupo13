import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';

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
        alert('Error al cargar el usuario');
        this.loading = false;
        this.router.navigate(['/usuario']);
        this.cdr.detectChanges();
      }
    });
  }

  guardar(): void {
    if (!this.usuario.nombre || !this.usuario.email || (!this.isEdit && !this.usuario.password)) {
      alert('Por favor complete los campos obligatorios');
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
          alert('Error al actualizar el usuario');
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.usuarioService.createUsuario(dataToSend).subscribe({
        next: (res) => {
          if (res.status === '0') {
            alert(res.msg); // Ej: Ya existe el email
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
          alert('Error al crear el usuario');
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
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.saving = true;
      this.usuarioService.deleteUsuario(this.usuario.usuarioId).subscribe({
        next: (res) => {
          this.saving = false;
          this.cdr.detectChanges();
          this.router.navigate(['/usuario']);
        },
        error: (err) => {
          console.error('Error eliminando', err);
          alert('Error al eliminar usuario');
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}

