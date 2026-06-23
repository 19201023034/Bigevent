import { useState, useCallback } from 'react';
import { translations } from '../translations';

const CONTENT_KEY = 'bigevent_cms_content';
const IMAGES_KEY  = 'bigevent_cms_images';
const AUTH_KEY    = 'bigevent_cms_auth';

// Password loaded from .env (VITE_ADMIN_PASSWORD). Never hardcode passwords in source!
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'bigevent2025';

function readJSON(key, fallback = {}) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}

export function useCMS(lang) {
  // ── Content overrides ─────────────────────────────────────────────
  const [overrides, setOverrides] = useState(() => readJSON(CONTENT_KEY));

  // Merged translation: defaults + per-language overrides
  const t = { ...translations[lang], ...(overrides[lang] || {}) };

  const saveField = useCallback((targetLang, key, value) => {
    setOverrides(prev => {
      const next = {
        ...prev,
        [targetLang]: { ...(prev[targetLang] || {}), [key]: value },
      };
      localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    setOverrides({});
    localStorage.removeItem(CONTENT_KEY);
  }, []);

  // ── Image overrides ───────────────────────────────────────────────
  const [images, setImages] = useState(() => readJSON(IMAGES_KEY));

  const saveImage = useCallback((key, dataUrlOrSrc) => {
    setImages(prev => {
      const next = { ...prev, [key]: dataUrlOrSrc };
      localStorage.setItem(IMAGES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetImages = useCallback(() => {
    setImages({});
    localStorage.removeItem(IMAGES_KEY);
  }, []);

  // ── Auth ──────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === '1');

  const login = useCallback((pw) => {
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, '1');
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }, []);

  return { t, overrides, saveField, resetContent, images, saveImage };
}
