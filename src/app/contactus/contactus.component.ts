import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  imports: [],
  template: `
<div class="contact-us bg-dark text-white py-4">
  <div class="container text-center">
    <h5>Contact Us</h5>
    <p>
      <a href="mailto:info@example.com" class="text-white text-decoration-none">
         info&#64;example.com
      </a>
    </p>
    <p>
      <a href="tel:+1234567890" class="text-white text-decoration-none">
         +1 (234) 567-890
      </a>
    </p>
    <div class="social-links mt-3">
      <a href="https://facebook.com" target="_blank" class="text-white me-3">
        <i class="bi bi-facebook"></i> Facebook
      </a>
      <a href="https://twitter.com" target="_blank" class="text-white me-3">
        <i class="bi bi-twitter"></i> Twitter
      </a>
      <a href="https://linkedin.com" target="_blank" class="text-white">
        <i class="bi bi-linkedin"></i> LinkedIn
      </a>
    </div>
  </div>
</div>
  `,
  styles: `,
         "src/styles.css",`
})
export class ContactusComponent {

}
