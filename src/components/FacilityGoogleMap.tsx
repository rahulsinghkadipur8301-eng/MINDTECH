import React from 'react';
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

const EmbeddedGoogleMapFallback: React.FC = () => (
  <iframe
    title="Mindtech Biotechnology Central Facility Hub — Bawana, New Delhi"
    src={`https://maps.google.com/maps?q=${FACILITY_COORDS.lat},${FACILITY_COORDS.lng}&t=k&z=16&output=embed`}
    className="w-full h-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  />
);

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
