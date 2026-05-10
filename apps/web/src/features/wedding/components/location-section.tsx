"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { weddingContent } from "../data/wedding-content";
import { SectionHeader } from "./section-header";

const kakaoMapAppKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? "38b7d58c9b26ed2600590e9ea712530c";
const kakaoMapScriptId = "kakao-map-sdk";
const naverMapUrl = "https://brr.kr/hhqc59";
const kakaoMapUrl = "https://brr.kr/i665g1";
const weddingVenuePosition = { lat: 37.4818021, lng: 126.7984948 };
let kakaoMapScriptPromise: Promise<void> | null = null;

type KakaoLatLng = unknown;

type KakaoMaps = {
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => {
    setCenter: (latLng: KakaoLatLng) => void;
  };
  Marker: new (options: { map: unknown; position: KakaoLatLng }) => unknown;
  load: (callback: () => void) => void;
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}

export function LocationSection() {
  const { location } = weddingContent;

  return (
    <section id="location" className="px-6 py-20">
      <SectionHeader
        eyebrow="Location"
        title={location.venue}
        description={
          <>
            <span className="block">{location.address}</span>
            <span className="mt-1 block">{location.phone}</span>
          </>
        }
      />

      <KakaoMap title={location.venue} />

      <div className="space-y-9 text-center">
        <div className="mx-auto max-w-[310px] space-y-3">
          <h4 className="text-sm font-medium uppercase tracking-widest text-brand-gold">Subway</h4>
          <p className="text-center text-sm leading-relaxed text-brand-muted">
            {location.transitLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <a
            href={naverMapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-brand-gold/10 transition-transform hover:scale-105"
            aria-label="네이버 지도에서 MJ Convention 보기"
          >
            <Image src="/images/naver-map-icon.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          </a>
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#FFE500] shadow-sm ring-1 ring-brand-gold/10 transition-transform hover:scale-105"
            aria-label="카카오맵에서 MJ Convention 보기"
          >
            <Image src="/images/kakao-map-icon.png" alt="" width={46} height={46} className="h-11 w-11 object-contain" />
          </a>
        </div>
      </div>
    </section>
  );
}

function KakaoMap({ title }: { title: string }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [hasMapError, setHasMapError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadKakaoMapScript()
      .then(() => {
        if (!isMounted || !mapRef.current || !window.kakao) {
          return;
        }

        const { maps } = window.kakao;
        const venueLatLng = new maps.LatLng(weddingVenuePosition.lat, weddingVenuePosition.lng);
        const map = new maps.Map(mapRef.current, {
          center: venueLatLng,
          level: 3,
        });

        new maps.Marker({ map, position: venueLatLng });
      })
      .catch(() => {
        if (isMounted) {
          setHasMapError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative mx-auto mb-12 aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-lg border border-brand-gold/10 bg-brand-beige/30 shadow-sm">
      <div ref={mapRef} className="h-full w-full" aria-label={`${title} 카카오맵`} />
      {hasMapError ? (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs leading-5 text-brand-muted">
          지도를 불러오지 못했습니다.
          <br />
          아래 지도 버튼을 이용해 주세요.
        </div>
      ) : null}
    </div>
  );
}

function loadKakaoMapScript() {
  if (window.kakao?.maps) {
    return loadKakaoMaps();
  }

  if (kakaoMapScriptPromise) {
    return kakaoMapScriptPromise;
  }

  const existingScript = document.getElementById(kakaoMapScriptId);

  if (existingScript) {
    kakaoMapScriptPromise = new Promise<void>((resolve, reject) => {
      if (window.kakao?.maps) {
        loadKakaoMaps().then(resolve).catch(reject);
        return;
      }

      existingScript.addEventListener("load", () => loadKakaoMaps().then(resolve).catch(reject), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Kakao Map SDK")), { once: true });
    });

    return kakaoMapScriptPromise;
  }

  kakaoMapScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = kakaoMapScriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapAppKey}&autoload=false`;
    script.async = true;
    script.addEventListener("load", () => {
      loadKakaoMaps().then(resolve).catch(reject);
    });
    script.addEventListener("error", () => reject(new Error("Failed to load Kakao Map SDK")));
    document.head.appendChild(script);
  });

  return kakaoMapScriptPromise;
}

function loadKakaoMaps() {
  return new Promise<void>((resolve, reject) => {
    if (!window.kakao?.maps) {
      reject(new Error("Kakao Map SDK is unavailable"));
      return;
    }

    window.kakao.maps.load(resolve);
  });
}
