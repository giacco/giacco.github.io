import { useEffect, useState } from 'react';

export type RoutePath = '/' | '/cv' | '/shell' | '/blog' | '/projects';

const routes: RoutePath[] = ['/', '/cv', '/shell', '/blog', '/projects'];

function readRoute(): RoutePath {
  const value = window.location.hash.replace(/^#/, '') || '/';
  return routes.includes(value as RoutePath) ? (value as RoutePath) : '/';
}

export function useRoute() {
  const [route, setRoute] = useState<RoutePath>(readRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}
