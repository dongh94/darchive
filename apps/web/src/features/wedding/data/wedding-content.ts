export const weddingContent = {
  couple: {
    groom: {
      role: "Groom",
      name: "김동희",
      facts: [
        { label: "담당", value: "길찾기와 계획 세우기" },
        { label: "특기", value: "조용히 챙겨주기" },
        { label: "취향", value: "커피, 산책, 기록" },
        { label: "지연 한정", value: "한없이 다정함" },
      ],
      imageUrl: "/images/wedding/groom-profile.jpeg",
      imageAlt: "김동희 프로필 사진",
    },
    bride: {
      role: "Bride",
      name: "변지연",
      facts: [
        { label: "담당", value: "분위기 살리기" },
        { label: "특기", value: "웃게 만들기" },
        { label: "취향", value: "맛있는 것, 예쁜 것, 귀여운 것" },
        { label: "동희 한정", value: "제일 강한 편" },
      ],
      imageUrl: "/images/wedding/bride-profile.jpeg",
      imageAlt: "변지연 프로필 사진",
    },
  },
  event: {
    title: "김동희 & 변지연 결혼식",
    description: "김동희 & 변지연의 소중한 결혼식에 초대합니다.",
    dateTime: "2026-09-12T16:40:00",
    dateLabel: "2026. 09. 12",
    dayTimeLabel: "토요일 오후 4시 40분",
    heroDateLabel: "2026. 09. 12 SAT PM 4:40",
    calendarStart: "20260912T164000",
    calendarEnd: "20260912T184000",
  },
  location: {
    venue: "MJ Convention",
    address: "경기도 부천시 소사구 소사본동 65-7(경인로 386)",
    phone: "032-347-5500",
    mapImageUrl: "https://picsum.photos/seed/map/600/600?grayscale",
    transitLines: ["1호선, 서해선 소사역 1번출구 건너편 좌측(70m)", "소사어울마당삼거리 · MJ 컨벤션 정류장 하차"],
  },
  gallery: [1, 2, 3, 4, 5, 6].map((item) => ({
    id: `wedding-gallery-${item}`,
    src: `https://picsum.photos/seed/wedding${item}/600/800`,
    alt: `웨딩 갤러리 사진 ${item}`,
  })),
  giftAccounts: [
    { side: "Groom's Side", name: "김동희", bank: "신한은행", account: "110-123-456789" },
    { side: "Bride's Side", name: "변지연", bank: "카카오뱅크", account: "3333-01-1234567" },
  ],
  share: {
    title: "김동희 & 변지연 결혼식",
    text: "2026년 9월 12일, 저희의 결혼식에 초대합니다.",
  },
  hero: {
    imageUrl: "/images/wedding/hero-couple.jpeg",
    imageAlt: "김동희 변지연 웨딩 사진",
  },
} as const;
