'use client';

import { useEffect, useState } from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag after component mounts
    setIsClient(true);

    // Clean up any external DOM modifications that cause hydration issues
    const cleanupExternalModifications = () => {
      try {
        // Remove common browser extension attributes that cause hydration errors
        const bodyElement = document.body;
        if (bodyElement) {
          // Remove attributes commonly injected by antivirus/extensions
          const attributesToRemove = [
            'inject_newvt_svd',
            'data-new-gr-c-s-check-loaded',
            'data-gr-ext-installed',
            'cz-shortcut-listen'
          ];
          
          attributesToRemove.forEach(attr => {
            if (bodyElement.hasAttribute(attr)) {
              bodyElement.removeAttribute(attr);
            }
          });
        }
      } catch (error) {
        // Silently handle any errors in cleanup
        console.debug('External DOM cleanup:', error);
      }
    };

    // Run cleanup after a short delay to allow extensions to inject their modifications
    const timeoutId = setTimeout(cleanupExternalModifications, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // During SSR or initial render, show children immediately
  // After hydration, ensure we're on client side
  if (!isClient) {
    return <>{children}</>;
  }

  return <>{children}</>;
} 