import { useAuth } from '../AuthContext';

export default function AdComponent({ slot, format = 'auto' }: { slot?: string, format?: string }) {
  const pubId = (import.meta as any).env.VITE_ADSENSE_PUB_ID;

  if (!pubId) {
    return (
      <div className="bg-stone-100 border border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center text-stone-400 text-sm italic">
        <p>Espaço para Publicidade</p>
        <p className="text-[10px] mt-1 uppercase tracking-widest font-bold">AdSense / AdMob Placeholder</p>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={pubId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  );
}
