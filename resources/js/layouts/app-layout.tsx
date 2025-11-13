/**
 * Restaurant Hub Application Layout  
 * UI/UX Design: Szabo Lilla (BDCRL0)
 * Technical Implementation: Mikhael Nabil Salama Rezk (IHUTSC)
 * 
 * Features:
 * - Responsive navigation with role-based menu items
 * - Modern gradient design with Tailwind CSS
 * - Mobile-first responsive layout
 * - Accessibility-focused component structure
 */

import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
