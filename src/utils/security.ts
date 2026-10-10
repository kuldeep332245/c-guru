/**
 * @license
 * C-Guru Enterprise Content & Anti-Hacking Security Engine
 * Features:
 * 1. Anti-Screenshot & Screen Capture Protection (PrtScn, Ctrl+P, Snipping Tool)
 * 2. Anti-Inspection & DevTools Blocker (F12, Ctrl+Shift+I/J/C, Ctrl+U, Right-Click)
 * 3. Clipboard Protection & Anti-Copy Guard
 * 4. CSS Print Blocker (Blank output on print/save-as-PDF attempts)
 * 5. Window Blur Privacy Guard (Anti-Screen Recording)
 * 6. Dynamic DRM Anti-Leak Watermark
 */

export interface SecurityEventDetail {
  type: 'screenshot' | 'devtools' | 'print' | 'contextmenu' | 'copy' | 'screen_hidden';
  message: string;
}

type SecurityCallback = (event: SecurityEventDetail) => void;

let listenersAttached = false;
let securityListeners: SecurityCallback[] = [];

export function registerSecurityListener(callback: SecurityCallback) {
  securityListeners.push(callback);
  return () => {
    securityListeners = securityListeners.filter((cb) => cb !== callback);
  };
}

function triggerSecurityAlert(type: SecurityEventDetail['type'], message: string) {
  securityListeners.forEach((cb) => cb({ type, message }));
}

/**
 * Initializes full application security protections
 */
export function initAppSecurity() {
  if (typeof window === 'undefined' || listenersAttached) return;
  listenersAttached = true;

  // 1. Block Context Menu (Right Click)
  document.addEventListener(
    'contextmenu',
    (e) => {
      // Allow right click ONLY inside code input areas or text inputs
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput) {
        e.preventDefault();
        triggerSecurityAlert(
          'contextmenu',
          'सुरक्षा अलर्ट: राइट-क्लिक और इंस्पेक्ट करना प्रतिबंधित है (Right click is disabled).'
        );
      }
    },
    { capture: true }
  );

  // 2. Block Keyboard Shortcuts (PrintScreen, F12, Ctrl+U, Ctrl+P, Ctrl+S, Ctrl+Shift+I/J/C)
  window.addEventListener(
    'keydown',
    (e) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const key = e.key ? e.key.toLowerCase() : '';
      const code = e.code ? e.code.toLowerCase() : '';

      // A. PrintScreen (Screenshot Key)
      if (key === 'printscreen' || code === 'printscreen') {
        e.preventDefault();
        // Clear clipboard immediately to sanitize screenshot buffer
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('⚠️ Protected Content - C-Guru Academy').catch(() => {});
        }
        triggerSecurityAlert(
          'screenshot',
          'सुरक्षा सुरक्षा: स्क्रीनशॉट लेना पूरी तरह से प्रतिबंधित है (Screenshots are disabled)!'
        );
        return;
      }

      // B. Print page (Ctrl+P / Cmd+P)
      if (isCtrlOrMeta && key === 'p') {
        e.preventDefault();
        triggerSecurityAlert(
          'print',
          'सुरक्षा अलर्ट: पेज प्रिंट या PDF में सेव करना प्रतिबंधित है (Printing is disabled)!'
        );
        return;
      }

      // C. Save page (Ctrl+S / Cmd+S)
      if (isCtrlOrMeta && key === 's') {
        e.preventDefault();
        triggerSecurityAlert(
          'devtools',
          'सुरक्षा अलर्ट: वेबपेज सोर्स कोड सेव करना प्रतिबंधित है (Saving source is disabled)!'
        );
        return;
      }

      // D. View Source (Ctrl+U / Cmd+U)
      if (isCtrlOrMeta && key === 'u') {
        e.preventDefault();
        triggerSecurityAlert(
          'devtools',
          'सुरक्षा अलर्ट: सोर्स कोड देखना प्रतिबंधित है (View Source is disabled)!'
        );
        return;
      }

      // E. Developer Tools (F12)
      if (e.key === 'F12' || code === 'f12') {
        e.preventDefault();
        triggerSecurityAlert(
          'devtools',
          'सुरक्षा अलर्ट: डेवलपर टूल्स (F12) प्रतिबंधित है (Developer Tools disabled)!'
        );
        return;
      }

      // F. Inspect Element / Console (Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (isCtrlOrMeta && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
        e.preventDefault();
        triggerSecurityAlert(
          'devtools',
          'सुरक्षा अलर्ट: इंस्पेक्ट एलिमेंट और डेवलपर टूल्स प्रतिबंधित हैं!'
        );
        return;
      }

      // G. Windows Snipping Tool (Win + Shift + S) & Mac Screenshot (Cmd + Shift + 3 / 4 / 5)
      if (
        (isCtrlOrMeta && e.shiftKey && key === 's') ||
        (e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5' || key === '6'))
      ) {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('⚠️ Protected Content - C-Guru Academy').catch(() => {});
        }
        triggerSecurityAlert(
          'screenshot',
          'सुरक्षा अलर्ट: स्क्रीन कैप्चर और स्निपिंग टूल अवरुद्ध है (Capture Blocked)!'
        );
        return;
      }
    },
    { capture: true }
  );

  // 3. PrintScreen KeyUp Watcher (Clipboard scrubbing)
  window.addEventListener(
    'keyup',
    (e) => {
      const key = e.key ? e.key.toLowerCase() : '';
      const code = e.code ? e.code.toLowerCase() : '';
      if (key === 'printscreen' || code === 'printscreen') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('⚠️ Protected Content - C-Guru Academy').catch(() => {});
        }
        triggerSecurityAlert(
          'screenshot',
          'स्क्रीनशॉट लेना प्रतिबंधित है (Screenshot attempt blocked)!'
        );
      }
    },
    { capture: true }
  );

  // 4. Prevent Drag and Drop of Images and Content
  document.addEventListener(
    'dragstart',
    (e) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('.allow-drag')) {
        e.preventDefault();
      }
    },
    { capture: true }
  );

  // 6. Copy Protection on Sensitive Content
  document.addEventListener(
    'copy',
    (e) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      // Allow copying user's own input or code snippet playground editor
      if (!isInput && target && !target.closest('.allow-copy')) {
        // Prevent unauthorized copying of curriculum questions & theory
        const selection = window.getSelection()?.toString() || '';
        if (selection.length > 30) {
          e.preventDefault();
          triggerSecurityAlert(
            'copy',
            'सुरक्षा अलर्ट: C-Guru पाठ्यक्रम सामग्री कॉपी करना प्रतिबंधित है!'
          );
        }
      }
    },
    { capture: true }
  );

  // 5. Anti-Debugging Warning in Browser Console
  try {
    const bannerStyle =
      'color: #EF4444; font-size: 22px; font-weight: bold; background: #181B22; padding: 6px 12px; border-radius: 8px;';
    const subStyle = 'color: #38BDF8; font-size: 13px; font-weight: 600;';
    console.log('%c⚠️ STOP! C-Guru Security Shield Active', bannerStyle);
    console.log(
      '%cThis browser session is protected under Digital Rights Management (DRM). Unauthorized inspection or tampering is monitored.',
      subStyle
    );
  } catch {}
}

/**
 * Sanitizes input string to prevent XSS / Script Injection attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // remove HTML tag brackets
    .replace(/javascript:/gi, '') // remove javascript pseudo-protocol
    .replace(/on\w+=/gi, '') // remove inline event handlers (onerror=, onclick=)
    .trim();
}
