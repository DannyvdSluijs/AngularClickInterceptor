import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  trackLinkClick(isInternal: boolean, destinationUrl: URL, linkText: string): void {
    console.log('Analytics was called', {
      event: isInternal ? 'internal_link_click' : 'external_link_click',
      destination_url: destinationUrl.toString(),
      click_text: linkText
    });
  }
}
