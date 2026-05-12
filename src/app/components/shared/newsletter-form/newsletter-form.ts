import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha-2';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { LucideMail } from '@lucide/angular';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-newsletter-form',
  imports: [ReactiveFormsModule, HlmButton, HlmInput, LucideMail],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.css',
})
export class NewsletterForm {
  public newsletterForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.email, Validators.required] }),
  });
  public processing = false;
  private recaptchaV3Service = inject(ReCaptchaV3Service);

  submit() {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }

    this.processing = true;
    this.recaptchaV3Service.execute('subscribe_to_newsletter').subscribe({
      next: async (token) => {
        const formData = new FormData();
        formData.append('email', this.newsletterForm.controls.email.value!);
        formData.append('g-recaptcha-response', token);
        formData.append('form-name', 'NewsLetter');

        try {
          const response = await fetch(window.location.pathname, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString(),
          });
          if (response.status === 200) {
            toast.success('Thanks');
            this.newsletterForm.reset();
            return;
          }
          toast.error('Newsletter subscription failed');
        } catch (error) {
          console.error(error);
          toast.error('Newsletter subscription failed');
        } finally {
          this.processing = false;
        }
      },
      error: () => {
        this.processing = false;
        toast.error('Operation failed, please try again later');
      },
    });
  }
}
