import { useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';

export default function AdComponent({ slot, format = 'auto' }: { slot?: string, format?: string }) {
  const { profile } = useAuth();
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const pubId = import.meta.env.VITE_ADSENSE_PUB_ID as string | undefined;

  useEffect(() => {
    if (!pubId || !adRef.current || pushed.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, [pubId]);

  if (profile?.plan === 'pro') return null;

  if (!pubId) {
    return (
      <div className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-8 flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 text-sm italic">
        <p>Espaço para Publicidade</p>
        <p className="text-[10px] mt-1 uppercase tracking-widest font-bold">AdSense Placeholder</p>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden flex justify-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={pubId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
