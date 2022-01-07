import { Component, HostListener } from '@angular/core';
import { Router, ResolveEnd } from '@angular/router';
import { AnalyticsService } from './analytics.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClickInterception';

  private lastKnownUrl: string = '/';

  constructor(private router: Router, private analyticsService: AnalyticsService) {
    // Keep track of the current url before router events progress and the `window.location.href` is updated.
    this.router.events.pipe(
      filter(event => event instanceof ResolveEnd)
    ).subscribe(() => {
      this.lastKnownUrl = this.router.url;
    });
  }

  @HostListener('document:click')
  clickout(_event: any) {
    const tEvent = _event || window.event;
    const element = tEvent.target || tEvent.srcElement;

    // Only track A elements, perhaps should also include buttons?
    if (element.tagName !== 'A') {
      return true;
    }

    let currentUrl: URL;
    if (element.getAttribute('routerLink')) {
      // Angular <a routerLink=""> elements used for internal links
      currentUrl = new URL(this.lastKnownUrl, window.location.protocol + "//" + window.location.host);
    } else {
      // Regular <a href=""> elements used for external links
      currentUrl = new URL(window.location.href);
    }
    
    const href = element.getAttribute('href');
    const destinationUrl = href && href.startsWith('http')
      ? new URL(href)
      : new URL(href, currentUrl.protocol + '//' + currentUrl.host);  
    const linkText = element.innerText;
    const isInternal = currentUrl.host == destinationUrl.host;

    this.analyticsService.trackLinkClick(isInternal, destinationUrl, linkText);

    return true;
  }
}
