/**
 * Admin Security & Role-Based Access Control (RBAC)
 * Al Rehman Garden Phase 2 Lahore Operations System
 */

export type UserRole = 'admin' | 'editor' | 'verification_manager' | 'sales_manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
}

export interface PermissionMatrix {
  canApproveProperties: boolean;
  canEditProperties: boolean;
  canDeleteProperties: boolean;
  canManageLeads: boolean;
  canManageDealers: boolean;
  canEditContent: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, PermissionMatrix> = {
  admin: {
    canApproveProperties: true,
    canEditProperties: true,
    canDeleteProperties: true,
    canManageLeads: true,
    canManageDealers: true,
    canEditContent: true,
    canViewAnalytics: true,
    canManageUsers: true,
  },
  editor: {
    canApproveProperties: false,
    canEditProperties: true,
    canDeleteProperties: false,
    canManageLeads: false,
    canManageDealers: false,
    canEditContent: true,
    canViewAnalytics: true,
    canManageUsers: false,
  },
  verification_manager: {
    canApproveProperties: true,
    canEditProperties: true,
    canDeleteProperties: false,
    canManageLeads: false,
    canManageDealers: true,
    canEditContent: false,
    canViewAnalytics: true,
    canManageUsers: false,
  },
  sales_manager: {
    canApproveProperties: false,
    canEditProperties: false,
    canDeleteProperties: false,
    canManageLeads: true,
    canManageDealers: true,
    canEditContent: false,
    canViewAnalytics: true,
    canManageUsers: false,
  },
};

export const CURRENT_ADMIN_USER: AdminUser = {
  id: 'USR-ARG-001',
  name: 'Lead Operations Architect',
  email: 'admin@alrehmangarden.pk',
  role: 'admin',
  lastLogin: '2026-09-01T22:50:00Z',
};

/**
 * Checks if a user has a specific permission
 */
export function hasPermission(user: AdminUser, permission: keyof PermissionMatrix): boolean {
  return ROLE_PERMISSIONS[user.role]?.[permission] ?? false;
}
