import React, { useCallback, useState } from 'react';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseFormspreeReturn {
  status: FormStatus;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

export function useFormspree(formId: string): UseFormspreeReturn {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus('submitting');
      const form = e.currentTarget;
      const data = new FormData(form);

      try {
        const response = await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          setStatus('success');
          form.reset();
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    },
    [formId],
  );

  const reset = useCallback(() => setStatus('idle'), []);

  return { status, handleSubmit, reset };
}
