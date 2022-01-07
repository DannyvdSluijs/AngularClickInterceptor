import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HrefInterceptorService {
  constructor() {
    document.onclick = this.interceptHref;
  }

  interceptHref(_event) {
    const tEvent = _event || window.event;
    const element = tEvent.target || tEvent.srcElement;

    if (element.tagName !== 'A') {
      return true;
    }

    const href = element.getAttribute('href');
    const routerLink = element.getAttribute('routerLink');

    const currentUrl = new URL(window.location.href);
    const clickedUrl = href
      ? new URL(href)
      : new URL(routerLink, currentUrl.protocol + '//' + currentUrl.host);
    const isExternal = currentUrl.host != clickedUrl.host;
    const linkText = element.innerText;

    console.log('Current url', window.location.href);
    console.log('Clicked URL:', clickedUrl);
    console.log('Is external:', isExternal);
    console.log('Link text:', linkText);
    console.log('');
  }
}
