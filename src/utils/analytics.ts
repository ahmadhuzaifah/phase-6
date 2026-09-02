/**
 * Real Estate Analytics & Event Tracking Engine
 * DHA Phase 6 Lahore Authority Website
 * Dispatches custom events and interacts with Google Analytics / Meta Pixel when configured.
 */

export interface PropertyAnalyticsEvent {
  eventName:
    | 'property_view'
    | 'whatsapp_click'
    | 'phone_click'
    | 'search_performed'
    | 'filter_applied'
    | 'inquiry_submitted'
    | 'map_opened'
    | 'brochure_requested';
  propertyId?: string;
  propertyTitle?: string;
  propertyPrice?: number;
  block?: string;
  category?: string;
  sourcePage?: string;
  timestamp?: string;
}

/**
 * Tracks property conversion interactions
 */
export function trackEvent(event: PropertyAnalyticsEvent): void {
  const payload = {
    ...event,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
  };

  if (typeof window !== 'undefined') {
    // Dispatch local custom event
    window.dispatchEvent(new CustomEvent('arg_analytics', { detail: payload }));

    // Send to Google Analytics 4 (dataLayer) if available
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === 'function') {
      w.gtag('event', payload.eventName, {
        property_id: payload.propertyId,
        property_title: payload.propertyTitle,
        property_price: payload.propertyPrice,
        block: payload.block,
        page_location: payload.url,
      });
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: payload.eventName, ...payload });
    }
  }
}
