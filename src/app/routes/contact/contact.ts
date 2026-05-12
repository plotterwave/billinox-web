import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Navbar } from '../../components/site/navbar/navbar';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideChevronDown,
  LucideSend,
  LucideClock,
  LucideMapPin,
  LucideMail,
  LucideShieldCheck,
  LucideHeadphones,
} from '@lucide/angular';
import { NgClass } from '@angular/common';
import { Footer } from '../../components/site/footer/footer';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { NgIconComponent } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmSelect, HlmSelectImports } from '@spartan-ng/helm/select';
import { SeoService } from '../../services/seo.service';
import { socials } from '../../constants/socials.constant';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha-2';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-contact',
  imports: [
    Navbar,
    LucideDynamicIcon,
    LucideCircleCheck,
    ReactiveFormsModule,
    LucideChevronDown,
    LucideSend,
    LucideClock,
    NgClass,
    LucideMapPin,
    Footer,
    HlmInput,
    HlmTextarea,
    NgIconComponent,
    HlmButton,
    HlmSelectImports,
    HlmSpinnerImports,
    RecaptchaV3Module,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactPage {
  public methods = [
    {
      icon: LucideMail,
      title: 'Email Support',
      desc: 'General questions about Billinox.',
      action: 'hello@billinox.com',
      href: 'mailto:hello@billinox.com',
    },
    // {
    //   icon: LucideBriefcase,
    //   title: 'Sales Inquiries',
    //   desc: 'Talk to our team about pricing and plans.',
    //   action: 'sales@billinox.com',
    //   href: 'mailto:sales@billinox.com',
    // },
    {
      icon: LucideHeadphones,
      title: 'Technical Support',
      desc: 'Get help with installation, sync, or backups.',
      action: 'support@billinox.com',
      href: 'mailto:support@billinox.com',
    },
    // {
    //   icon: LucideHandshake,
    //   title: 'Partnership Requests',
    //   desc: 'Integrations, resellers, and co-marketing.',
    //   action: 'partners@billinox.com',
    //   href: 'mailto:partners@billinox.com',
    // },
    {
      icon: LucideShieldCheck,
      title: 'Legal & Privacy',
      desc: 'Data requests and compliance topics.',
      action: 'privacy@billinox.com',
      href: 'mailto:privacy@billinox.com',
    },
  ];

  public categories = [
    'General',
    // 'Sales',
    'Technical',
    // 'Partnership',
    'Legal & Privacy',
  ] as const;
  public categoriesToString = (value: string) =>
    this.categories.find((item) => item === value) || '';
  public openFaq = 0;
  public faqs = [
    {
      q: 'How do I backup my data?',
      a: 'Enable cloud backup in Settings → Backups. You can also export local snapshots at any time.',
    },
    {
      q: 'Does Billinox work offline?',
      a: 'Yes. Billinox is offline-first — every core feature works without an internet connection.',
    },
    {
      q: 'How do I export invoices?',
      a: 'Open any invoice and choose Export → PDF, or bulk export from the Invoices list.',
    },
    {
      q: 'How do I contact support?',
      a: 'Email support@billinox.com or use the contact form on this page. We reply within one business day.',
    },
  ];

  public socials = socials;

  public contactForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    subject: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    category: new FormControl<(typeof this.categories)[number]>(
      this.categories[0],
    ),
    message: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(2000),
      ],
    }),
  });

  public status: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
  public errors = {
    nameRequired: 'name is required',
    nameMin: 'name must be at least 2 characters',
    nameMax: 'name must be less than 50 characters',
    emailRequired: 'email is required',
    emailInvalid: 'email is invalid',
    subjectRequired: 'subject is required',
    subjectMin: 'subject must be at least 2 characters',
    subjectMax: 'subject must be less than 100 characters',
    messageRequired: 'message is required',
    messageMin: 'message must be at least 5 characters',
    messageMax: 'message must be less than 2000 characters',
  };

  public get fc() {
    return this.contactForm.controls;
  }

  private readonly seoService = inject(SeoService);
  private recaptchaV3Service = inject(ReCaptchaV3Service);

  constructor() {
    this.seoService.optimize({
      title: "Contact Billinox — We'd Love to Hear From You",
      meta: [
        {
          name: 'description',
          content:
            'Reach the Billinox team for support, sales, partnerships, and privacy questions. Fast, friendly responses from real humans.',
        },
        { property: 'og:title', content: 'Contact Billinox' },
        {
          property: 'og:description',
          content:
            'Talk to the Billinox team — support, sales, and partnerships.',
        },
      ],
    });
  }

  setOpenFaq(value: number) {
    this.openFaq = value;
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.status = 'submitting';
    this.recaptchaV3Service.execute('contact_us').subscribe({
      next: async (token) => {
        const formData = new FormData();
        formData.append('name', this.fc.name.value!);
        formData.append('email', this.fc.email.value!);
        formData.append('subject', this.fc.subject.value!);
        formData.append('category', this.fc.category.value!);
        formData.append('message', this.fc.message.value!);
        formData.append('g-recaptcha-response', token);
        formData.append('form-name', 'Contact');
        try {
          const response = await fetch(window.location.pathname, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString(),
          });

          if (response.status === 200) {
            this.status = 'success';
            this.contactForm.reset();
            return;
          }
          this.status = 'error';
        } catch (error) {
          this.status = 'error';
          toast.error('Operation failed');
        }
      },
      error: (error) => {
        this.status = 'error';
        toast.error('Operation failed, please try again later');
      },
    });
  }
}
