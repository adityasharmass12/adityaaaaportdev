import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const audioContextRef = useRef<AudioContext | null>(null);

  const applyTheme = (next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    root.classList.toggle('light', next === 'light');
    root.style.colorScheme = next;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', next === 'dark' ? '#020305' : '#eef2f9');
  };

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage may be unavailable.
    }
  }, [theme]);

  const playToggleSound = (toDark: boolean) => {
    try {
      const context = audioContextRef.current ?? new AudioContext();
      audioContextRef.current = context;
      const play = () => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const compressor = context.createDynamicsCompressor();
        const now = context.currentTime;
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(toDark ? 440 : 330, now);
        oscillator.frequency.exponentialRampToValueAtTime(toDark ? 330 : 523, now + 0.18);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        oscillator.connect(gain);
        gain.connect(compressor);
        compressor.connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.18);
      };
      if (context.state === 'suspended') {
        void context.resume().then(play).catch(() => {});
      } else {
        play();
      }
    } catch {
      // Audio must never prevent a theme change.
    }
  };

  const changeTheme = (next: Theme) => {
    const root = document.documentElement;
    const switchTheme = () => {
      root.classList.add('theme-switching');
      applyTheme(next);
      setThemeState(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage may be unavailable.
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.setTimeout(() => root.classList.remove('theme-switching'), 350);
        });
      });
    };
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };
    if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(switchTheme);
    } else {
      switchTheme();
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    playToggleSound(next === 'dark');
    changeTheme(next);
  };

  const setTheme = (next: Theme) => {
    if (next !== theme) changeTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
