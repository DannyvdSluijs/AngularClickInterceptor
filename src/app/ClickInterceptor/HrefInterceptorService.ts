import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HrefInterceptorService {
  constructor(private router: Router) {
    document.onclick = this.interceptHref;
  }

  interceptHref(_event) {
    const tEvent = _event || window.event;
    const element = tEvent.target || tEvent.srcElement;

    if (element.tagName !== 'A') {
      return true;
    }

    console.log(element.getAttribute('href'));
  }
}
