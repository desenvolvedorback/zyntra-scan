'use client';

import { useState } from 'react';

export function ZyntraWidget() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url) {
      setError('Por favor, insira uma URL.');
      return;
    }

    let formattedUrl = url.trim();
    if (!/^(https?:\/\/)/i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
      const reportUrl = `https://zyntra-scan.onrender.com/report?url=${encodeURIComponent(formattedUrl)}`;
      window.open(reportUrl, '_blank');
      setError('');
      setUrl('');
    } catch (_) {
      setError('Formato de URL inválido.');
      return;
    }
  };

  // Inline styles for portability, as this component's logic will be part of an external script.
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#111827',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #374151',
      color: '#f9fafb',
      maxWidth: '500px',
      margin: '0 auto',
    },
    title: {
      fontSize: '1.125rem',
      fontWeight: '600',
      margin: '0 0 4px 0',
      color: '#e5e7eb',
    },
    description: {
      fontSize: '0.875rem',
      color: '#9ca3af',
      margin: '0 0 16px 0',
    },
    form: {
      display: 'flex',
      gap: '8px',
    },
    input: {
      width: '100%',
      backgroundColor: '#1f2937',
      border: '1px solid #4b5563',
      color: '#f9fafb',
      padding: '10px',
      borderRadius: '6px',
      fontSize: '1rem',
    },
    button: {
      padding: '10px 16px',
      backgroundColor: '#7dd3fc',
      color: '#075985',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      whiteSpace: 'nowrap' as 'nowrap',
    },
    error: {
        color: '#f87171',
        fontSize: '0.875rem',
        marginTop: '8px',
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Zyntra Scan Widget</h3>
      <p style={styles.description}>Verifique a segurança de um link antes de clicar.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="url"
          placeholder="exemplo.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
          aria-label="URL para verificar"
        />
        <button type="submit" style={styles.button}>
          Verificar
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}
