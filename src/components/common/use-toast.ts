import { useEffect, useState, useCallback } from 'react';

/**
 * @description [en] Tiny toast hook. show(msg) renders a transient message that
 * auto-dismisses. No global state, no provider needed for the simple case where
 * one section needs feedback (the contact email-copy button).
 */
export const useToast = (autoHideMs = 1800) => {
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState(0);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setToken((t) => t + 1);
  }, []);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), autoHideMs);
    return () => clearTimeout(id);
  }, [message, token, autoHideMs]);

  return { message, show };
};
