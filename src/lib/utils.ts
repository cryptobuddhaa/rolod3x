import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function isValidUrl(urlString: string): boolean {
  try {
    if (!urlString) return false;
    if (urlString.startsWith('/')) return true;
    const urlToTest = urlString.startsWith('http') ? urlString : `https://${urlString}`;
    new URL(urlToTest);
    return true;
  } catch {
    return false;
  }
}

export function ensureValidImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('/')) return url;
  
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      new URL(url);
      return url;
    }
    const urlWithProtocol = `https://${url}`;
    new URL(urlWithProtocol);
    return urlWithProtocol;
  } catch {
    return '';
  }
}

export function validateSocialMediaLink(url: string): boolean {
  if (!url) return true; // Allow empty values
  try {
    const validUrl = url.startsWith('http') ? url : `https://${url}`;
    const parsedUrl = new URL(validUrl);
    return parsedUrl.hostname === 'x.com' || parsedUrl.hostname === 'linkedin.com';
  } catch {
    return false;
  }
}

export function formatSocialMediaLink(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}