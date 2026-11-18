import React, { useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { FACILITY_MAPS_URL } from './FacilityGoogleMapConstants';

export { FACILITY_MAPS_URL };

// Exact coordinates resolved from https://maps.app.goo.gl/RBcEXaRaBkcYNdMC8
const FACILITY_COORDS = {
  lat: 28.787099,
  lng: 77.0524451,
};

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

const FacilityMarkerWithInfoWindow: React.FC = () => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={FACILITY_COORDS}
        title={`${COMPANY_DETAILS.shortName} — Bawana Central Hub`}
      >
        <Pin
          background="#072414"
          borderColor="#10b981"
          glyphColor="#6ee7b7"
          scale={1.15}
        />
      </AdvancedMarker>

      {marker && (
        <InfoWindow
          anchor={marker}
          headerDisabled={true}
          shouldFocus={false}
          maxWidth={240}
        >
          <div className="px-1.5 py-0.5 text-center space-y-0.5">
            <div className="text-xs font-black text-[#072414] whitespace-nowrap">
              {COMPANY_DETAILS.shortName}
            </div>
            <div className="text-[10px] font-mono font-bold text-emerald-800 whitespace-nowrap">
              {FACILITY_COORDS.lat.toFixed(6)}° N, {FACILITY_COORDS.lng.toFixed(6)}° E
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

const EmbeddedGoogleMapFallback: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoadIframe) return;

    // Defer off-screen iframe mounting so initial above-the-fold page loads & crawls avoid legacy redirects
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoadIframe]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[256px] bg-gradient-to-br from-[#072414] via-[#0b3b21] to-[#0f4d2c] text-white flex flex-col justify-between p-4">
      {shouldLoadIframe ? (
        <iframe
          title="Mindtech Biotechnology Central Facility Hub — Bawana, New Delhi"
          src={`https://www.google.com/maps?q=${FACILITY_COORDS.lat},${FACILITY_COORDS.lng}&t=k&z=16&output=embed`}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-emerald-300" />
              <span>Bawana Facility GPS</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-200/90">
              {FACILITY_COORDS.lat.toFixed(6)}° N, {FACILITY_COORDS.lng.toFixed(6)}° E
            </span>
          </div>

          <div className="space-y-1.5 my-auto py-2">
            <div className="text-sm font-black text-white">
              {COMPANY_DETAILS.shortName}
            </div>
            <p className="text-xs text-emerald-100/85 leading-relaxed">
              Ground Floor-181, Pkt-D, Sec-3 Bawana DSIDC City, Opp. Delhi Jal Board, New Delhi - 110039
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShouldLoadIframe(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#072414] text-xs font-extrabold cursor-pointer transition-colors"
            >
              Load Satellite Map
            </button>
            <a
              href={FACILITY_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors"
            >
              <span>Open Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

const SdkMapContent: React.FC = () => {
  const status = useApiLoadingStatus();

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return <EmbeddedGoogleMapFallback />;
  }

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      defaultCenter={FACILITY_COORDS}
      defaultZoom={16}
      mapTypeId="satellite"
      mapTypeControl={false}
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      className="w-full h-full"
    >
      <FacilityMarkerWithInfoWindow />
    </GoogleMap>
  );
};

export const FacilityGoogleMap: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[256px] rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs bg-emerald-50/40">
      {MAPS_API_KEY ? (
        <APIProvider apiKey={MAPS_API_KEY} language="en" region="IN" libraries={['marker']}>
          <SdkMapContent />
        </APIProvider>
      ) : (
        <EmbeddedGoogleMapFallback />
      )}
    </div>
  );
};
