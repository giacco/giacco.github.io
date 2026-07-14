import { useEffect, useState } from 'react';
import RoutedApp from './RoutedApp';
import { PrintableCvPage } from './pages/PrintableCvPage';

function isPrintableCvRoute() {
  return window.location.hash.startsWith('#/cv/print');
}

export default function PortfolioRoot() {
  const [showPrintableCv, setShowPrintableCv] = useState(isPrintableCvRoute);

  useEffect(() => {
    const handleHashChange = () => setShowPrintableCv(isPrintableCvRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return showPrintableCv ? <PrintableCvPage /> : <RoutedApp />;
}
