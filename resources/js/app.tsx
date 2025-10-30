import '../css/app.css';

import axios from 'axios';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Set up CSRF token for axios and Inertia requests
const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
    // Set up CSRF token for Inertia.js requests
    router.on('before', (event: any) => {
        if (event.detail.visit.method.toLowerCase() !== 'get') {
            // Add CSRF token to headers
            event.detail.visit.headers = event.detail.visit.headers || {};
            event.detail.visit.headers['X-CSRF-TOKEN'] = token.content;
            
            // Also add CSRF token to form data
            if (event.detail.visit.data) {
                if (typeof event.detail.visit.data === 'object' && event.detail.visit.data !== null) {
                    event.detail.visit.data._token = token.content;
                }
            } else {
                event.detail.visit.data = { _token: token.content };
            }
        }
    });
}

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
