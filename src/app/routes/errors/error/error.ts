import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  public router = inject(Router);

  public reset() {}
}
