/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import RecentUpdates from './components/RecentUpdates';
import Footer from './components/Footer';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen selection:bg-google-blue selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <RecentUpdates />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

