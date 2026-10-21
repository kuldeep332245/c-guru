// ---------------- CLIENT SCREEN & CONTENT PROTECTION SHIELD ----------------

export type SecurityEvent = {
  type: 'screenshot' | 'devtools' | 'copy';
  message: string;
};

type SecurityListener = (event: SecurityEvent) => void;
const securityListeners: Set<SecurityListener> = new Set();

export function registerSecurityListener(listener: SecurityListener): () => void {
  securityListeners.add(listener);
  return () => {
    securityListeners.delete(listener);
  };
}

function notifySecurityEvent(event: SecurityEvent) {
  securityListeners.forEach(listener => {
    try {
      listener(event);
    } catch {}
  });
}

export function initAppSecurity() {
  if (typeof window === 'undefined') return;

  // Listen for PrintScreen / Screen capture shortcuts
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 's'))) {
      notifySecurityEvent({
        type: 'screenshot',
        message: 'सुरक्षा अलर्ट: स्क्रीनशॉट या स्क्रीन रिकॉर्डिंग प्रतिबंधित है।'
      });
    }
  });

  // Protect against shortcut devtools debugging in production
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
      (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
    ) {
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
        e.preventDefault();
        notifySecurityEvent({
          type: 'devtools',
          message: 'डेवलपर टूल्स का उपयोग प्रतिबंधित है।'
        });
      }
    }
  });
}
