// Visitor tracking utility
export interface VisitorInfo {
  timestamp: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  referrer: string;
  pageUrl: string;
  ipAddress?: string;
  location?: string;
}

export const trackVisitor = async (): Promise<void> => {
  try {
    const visitorInfo: VisitorInfo = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'Direct',
      pageUrl: window.location.href,
    };

    // Send to your API endpoint
    await fetch('/api/track-visitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorInfo),
    });
  } catch (error) {
    console.error('Failed to track visitor:', error);
  }
};

export const getVisitorIpAndLocation = async (): Promise<{ ip: string; location: string }> => {
  try {
    // Using ipapi.co for IP and location (free tier: 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip || 'Unknown',
      location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
    };
  } catch (error) {
    console.error('Failed to get IP/location:', error);
    return { ip: 'Unknown', location: 'Unknown' };
  }
};
