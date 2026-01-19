import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface RateLimitOptions {
  maxRequests?: number;
  windowMinutes?: number;
}

export function useRateLimit() {
  const { user } = useAuth();

  const checkRateLimit = useCallback(async (
    endpoint: string,
    options: RateLimitOptions = {}
  ): Promise<boolean> => {
    if (!user?.id) return true; // Allow if not authenticated (will be caught by other auth checks)

    const { maxRequests = 100, windowMinutes = 60 } = options;

    try {
      const { data, error } = await supabase.rpc('check_rate_limit', {
        p_user_id: user.id,
        p_endpoint: endpoint,
        p_max_requests: maxRequests,
        p_window_minutes: windowMinutes,
      });

      if (error) {
        console.error('Rate limit check error:', error);
        return true; // Allow on error to prevent blocking legitimate users
      }

      return data ?? true;
    } catch (error) {
      console.error('Rate limit error:', error);
      return true;
    }
  }, [user?.id]);

  return { checkRateLimit };
}
