// example: usePreviousRoute.js
'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function usePreviousRoute() {
  const pathname = usePathname();
  const previousPath = useRef(null);

  useEffect(() => {
    previousPath.current = pathname;
  }, [pathname]);

  return previousPath.current;
}
