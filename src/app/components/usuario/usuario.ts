import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario implements OnInit {
  usuarios: any[] = [];
  loading: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    console.log('Iniciando cargarUsuarios...');
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        console.log('Respuesta de usuarios recibida:', res);
        this.usuarios = res;
        this.loading = false;
        console.log('loading seteado a false. usuarios.length =', this.usuarios?.length);
        this.cdr.detectChanges(); // FORZAR DIBUJADO DE ANGULAR
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        this.loading = false;
        this.cdr.detectChanges(); // FORZAR DIBUJADO
        alert('Error al cargar los usuarios: ' + err.message);
      }
    });
  }

  crearUsuario(): void {
    this.router.navigate(['/usuario-form']);
  }

  editarUsuario(usuarioId: number): void {
    this.router.navigate(['/usuario-form', usuarioId]);
  }

  eliminarUsuario(usuarioId: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(usuarioId).subscribe({
        next: (res) => {
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error eliminando', err);
          alert('Error al eliminar usuario');
        }
      });
    }
  }
}

