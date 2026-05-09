export const weddingContent = {
  couple: {
    groom: {
      role: "Groom",
      name: "김동희",
      birthDate: "94년 4월 29일",
      hometown: "서울 영등포구",
      occupation: "IT 개발자",
      parents: "김세철 · 김민주의 장남",
      imageUrl: "https://picsum.photos/seed/groom/600/800",
      imageAlt: "김동희 프로필 사진",
    },
    bride: {
      role: "Bride",
      name: "변지연",
      birthDate: "98년 9월 1일",
      hometown: "서울 영등포구",
      occupation: "인사",
      parents: "미인의 차녀",
      imageUrl: "https://picsum.photos/seed/bride/600/800",
      imageAlt: "변지연 프로필 사진",
    },
  },
  event: {
    title: "김동희 & 변지연 결혼식",
    description: "김동희 & 변지연의 소중한 결혼식에 초대합니다.",
    dateTime: "2026-09-12T16:40:00",
    dateLabel: "2026. 9. 12",
    dayTimeLabel: "토요일 오후 4시 40분",
    heroDateLabel: "2026. 9. 12 SAT PM 4:40",
    calendarStart: "20260912T164000",
    calendarEnd: "20260912T184000",
  },
  location: {
    venue: "웨딩홀 아모리스",
    address: "서울특별시 강남구 테헤란로 123",
    phone: "02-1234-5678",
    mapImageUrl: "https://picsum.photos/seed/map/600/600?grayscale",
    transitLines: ["2호선 강남역 12번 출구에서 도보 5분", "9호선 신논현역 4번 출구에서 도보 10분"],
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
    imageUrl: "/images/wedding/main-portrait.jpeg",
    imageAlt: "김동희 변지연 웨딩 메인 일러스트",
  },
} as const;
