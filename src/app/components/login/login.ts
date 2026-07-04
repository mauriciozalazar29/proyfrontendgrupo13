import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  isLoading = false;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMsg = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Dependiendo del rol podemos mandarlo a un lugar u otro, por defecto a la caja o home
        if (this.authService.tienePermiso('cobrar_pedido') || this.authService.tienePermiso('abrir_caja')) {
          this.router.navigate(['/caja']);
        } else if (this.authService.tienePermiso('gestionar_usuarios')) {
          this.router.navigate(['/usuario']); // Panel admin si existiera
        } else if (this.authService.tienePermiso('ver_items_cocina')) {
          this.router.navigate(['/cocina']);
        } else {
          this.router.navigate(['/mesa']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      }
    });
  }
}
