import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Menu,
  X,
  Home,
  Database,
  Music,
  FolderGit2,
  Package,
  Archive,
  Heart,
  Info,
  ChevronUp,
} from 'lucide-react';
import { FooterMessage } from '../infrastructure/constants';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  pathname?: string;
  isMobile?: boolean;
};

const navigationLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Data', href: '/data', icon: Database },
  { type: 'divider' as const },
  { name: 'Guitars', href: '/guitars', icon: Music },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Instruments', href: '/instruments', icon: Package },
  { type: 'divider' as const },
  { name: 'Archive', href: '/archive', icon: Archive },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { type: 'divider' as const },
  { name: 'About', href: '/about', icon: Info },
];

export default function Layout({
  children,
  title,
  pathname = '',
}: LayoutProps): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <Head>
        <title>{title || 'GuitarHousehold'}</title>
        <link rel="icon" type="image/png" href="/guitar-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/guitar-16x16.png" sizes="16x16" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#FE6B8B" />
      </Head>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#FE6B8B] to-[#FF8E53] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
            >
              GuitarHousehold
            </Link>
          </div>

          {pathname && (
            <div className="text-sm font-medium text-white/90 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              {pathname}
            </div>
          )}
        </div>
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Drawer"
          className="fixed inset-0 z-50 flex"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Slide-over panel */}
          <div className="relative flex flex-col w-72 max-w-[80vw] bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-300">
            <div className="p-4 flex items-center justify-between border-b border-neutral-100 bg-gradient-to-r from-[#FE6B8B]/10 to-[#FF8E53]/10">
              <span className="font-semibold text-neutral-800 text-lg">Menu</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {navigationLinks.map((item, idx) => {
                if ('type' in item && item.type === 'divider') {
                  return <hr key={`divider-${idx}`} className="my-2 border-neutral-200" />;
                }

                const NavIcon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-medium text-sm"
                  >
                    <NavIcon className="w-5 h-5 text-neutral-500" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-xs text-neutral-500">
          <p>{FooterMessage}</p>
        </div>
      </footer>

      {/* Scroll to top floating button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-gradient-to-r from-[#FE6B8B] to-[#FF8E53] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE6B8B]"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
