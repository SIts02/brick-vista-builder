import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Json } from '@/integrations/supabase/types';

type AuditAction = 
  | 'login'
  | 'logout'
  | 'signup'
  | 'password_reset'
  | 'profile_update'
  | 'transaction_create'
  | 'transaction_update'
  | 'transaction_delete'
  | 'budget_create'
  | 'budget_update'
  | 'goal_create'
  | 'goal_update'
  | 'settings_update'
  | 'mfa_enable'
  | 'mfa_disable'
  | 'export_data'
  | 'import_data';

interface AuditMetadata {
  [key: string]: unknown;
}

export function useAuditLog() {
  const { user } = useAuth();

  const logEvent = useCallback(async (
    action: AuditAction,
    resource?: string,
    metadata?: AuditMetadata
  ): Promise<void> => {
    if (!user?.id) return;

    try {
      // Sanitize metadata - remove any sensitive data and convert to Json
      const sanitizedMetadata = metadata ? sanitizeMetadata(metadata) : {};

      await supabase.rpc('log_audit_event', {
        p_action: action,
        p_resource: resource || null,
        p_metadata: sanitizedMetadata as Json,
      });
    } catch (error) {
      // Silently fail - audit logging should not block user actions
      console.error('Audit log error:', error);
    }
  }, [user?.id]);

  return { logEvent };
}

// Remove sensitive fields from metadata before logging
function sanitizeMetadata(metadata: AuditMetadata): Record<string, Json> {
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'credit_card', 'cvv', 'ssn'];
  const sanitized: Record<string, Json> = {};

  for (const [key, value] of Object.entries(metadata)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveFields.some(field => lowerKey.includes(field))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeMetadata(value as AuditMetadata) as unknown as Json;
    } else if (
      typeof value === 'string' || 
      typeof value === 'number' || 
      typeof value === 'boolean' || 
      value === null ||
      Array.isArray(value)
    ) {
      sanitized[key] = value as Json;
    } else {
      sanitized[key] = String(value);
    }
  }

  return sanitized;
}
