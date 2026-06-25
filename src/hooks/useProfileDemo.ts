import { useState, useEffect } from 'react';

export interface ProfileDemoState {
  hasPhoto: boolean;
  hasBio: boolean;
  hasShipping: boolean;
  hasPayment: boolean;
}

const DEFAULT_STATE: ProfileDemoState = {
  hasPhoto: false,
  hasBio: false,
  hasShipping: false,
  hasPayment: false,
};

export function useProfileDemo() {
  const [state, setState] = useState<ProfileDemoState>(() => {
    try {
      const saved = localStorage.getItem('trustlayer_profile_demo');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem('trustlayer_profile_demo', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<ProfileDemoState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetDemo = () => {
    setState(DEFAULT_STATE);
  };

  const progress = 80 
    + (state.hasBio ? 10 : 0)
    + (state.hasPhoto ? 10 : 0);

  return { state, updateState, resetDemo, progress };
}
