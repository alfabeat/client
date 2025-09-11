import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  imports: [],
  template: `
<div class="contact-us-side">
  <div class="contact-details">
    <h5>Contact Us</h5>
    <p>
      <a href="mailto:info@example.com" >
         info&#64;example.com
      </a>
    </p>
    <p>
      <a href="tel:+1234567890" >
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
  <div class="mapouter">
    <div class="gmap_canvas">
      <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
        src="https://maps.google.com/maps?width=400&amp;height=200&amp;hl=en&amp;q=2880 Broadway, New York&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
     
    </div>
  </div>
</div>
  `,
  styles: [`
.contact-us-side {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  color: #222;
}
.contact-details {
  flex: 1;
}
.mapouter, .gmap_canvas {
  width: 300px;
  height: 150px;
}
.gmap_iframe {
  width: 300px !important;
  height: 150px !important;
}
`]
})
export class ContactusComponent {

}
