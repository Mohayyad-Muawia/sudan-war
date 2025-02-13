import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const middleware = createMiddleware({
  ...routing,
  defaultLocale: 'ar', // Ensure Arabic is enforced
  localeDetection: false // Prevent automatic locale detection
});

export default middleware;

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
