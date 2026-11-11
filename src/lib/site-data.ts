export type CharacterCategory =
  | "전체"
  | "몬스터"
  | "동물"
  | "귀여운 캐릭터"
  | "시즌 캐릭터"
  | "기타";

export interface CharacterItem {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  category: Exclude<CharacterCategory, "전체">;
  supplyType: "자체 확보" | "외부 조달";
  moodTags: string[];
  recommendedEvents: string[];
  summary: string;
  description: string;
  features: string[];
  performances: string[];
  sizeSpec: string;
  availabilityStatus: "예약 가능" | "일정 확인 필요";
  isSample: boolean;
  visualTheme: {
    bgGradient: string;
    accentColor: string;
    badgeColor: string;
    characterType: "hugmon" | "dino" | "bear" | "bunny" | "rudolph" | "lion";
  };
}

export interface ServiceItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  targetCustomers: string[];
  activities: string[];
  operationSteps: string[];
  recommendedPackage: "STARTER" | "BUSINESS" | "PREMIUM";
  iconName: "Store" | "Sparkles" | "PartyPopper" | "Building2" | "HeartHandshake";
  accentColor: string;
}

export interface PackageItem {
  id: "STARTER" | "BUSINESS" | "PREMIUM";
  name: string;
  subtitle: string;
  priceText: string;
  priceNumber: number | null;
  characterCount: string;
  duration: string;
  recommended: boolean;
  summary: string;
  features: string[];
  suitableFor: string[];
  conditionNote: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: "매장 오픈" | "브랜드 프로모션" | "축제·지역 행사" | "기업 행사" | "특별 이벤트";
  eventDate: string;
  location: string;
  packageUsed: "STARTER" | "BUSINESS" | "PREMIUM";
  charactersUsed: string[];
  summary: string;
  activitiesProvided: string[];
  operationNote: string;
  isSample: boolean;
  mediaType: "PHOTO" | "SHORT_VIDEO";
  visualTheme: {
    bg: string;
    accent: string;
    characterType: "hugmon" | "dino" | "bear" | "bunny" | "rudolph" | "lion";
  };
}

export const BRAND_INFO = {
  name: "HUG MONSTER",
  koreanName: "허그몬스터",
  slogan: "사람들은 광고를 피하지만, 즐거운 경험은 스스로 공유합니다.",
  englishSlogan: "Make People Smile, Make Brands Memorable.",
  description:
    "거리의 발걸음을 멈추고 인증샷과 참여로 브랜드를 각인시키는 오프라인 체험형 이벤트 솔루션.",
  supplyPolicy: "자체 50% + 파트너 조달 50% 하이브리드 운영",
  operationModel: "상담·가용성 확인 → 운영 계획(SOP)·계약 → 현장 실행",
  contact: {
    companyName: "영팩토리얼",
    businessNumber: "699-86-03757",
    phone: "010-7710-3801",
    email: "contact@hugmonster.kr",
    address: "서울특별시 강남구 삼성로103길 6, 2층",
    operatingHours: "평일 09:30 ~ 18:30 (주말·공휴일 행사 상시 운영)",
  },
};

export const CORE_VALUES = [
  {
    code: "ENTERTAIN",
    title: "압도적 시선 집중",
    subtitle: "의외성 · 호기심 유발",
    description:
      "일상 공간에 등장한 캐릭터가 행인의 발걸음을 즉시 멈추게 합니다.",
    badge: "01 · ENTERTAIN",
  },
  {
    code: "CONNECT",
    title: "브랜드 호감 전이",
    subtitle: "긍정적 감정 연결",
    description:
      "캐릭터와의 즐거운 교감이 매장·브랜드의 호감으로 이어집니다.",
    badge: "02 · CONNECT",
  },
  {
    code: "ENGAGE",
    title: "자발적 SNS 공유",
    subtitle: "찍고 싶은 현장 콘텐츠",
    description:
      "버려지는 전단지 대신 고객 스스로 사진 찍고 공유하는 현장을 만듭니다.",
    badge: "03 · ENGAGE",
  },
];

export const CHARACTERS: CharacterItem[] = [
  {
    id: "char-01",
    slug: "hugmon-signature",
    name: "허그몬 (HUGMON)",
    englishName: "HUGMON SIGNATURE",
    category: "몬스터",
    supplyType: "자체 확보",
    moodTags: ["시그니처", "포토존 특화", "친근함"],
    recommendedEvents: ["매장 오픈", "브랜드 프로모션", "포토타임"],
    summary: "브랜드 시그니처 몬스터. 높은 주목도와 친화력으로 오픈 행사·포토타임을 이끕니다.",
    description:
      "전 연령층에 거부감 없이 다가가는 대표 캐릭터로, 매장 앞 집객과 프리허그·포토존 운영에 최적화되어 있습니다.",
    features: [
      "원거리 시인성이 뛰어난 시그니처 패치워크 디자인",
      "인증샷 촬영에 최적화된 표정과 볼륨감",
      "피켓 홍보 및 그리팅 주력 캐릭터",
    ],
    performances: ["프리허그 · 하이파이브", "리듬 율동 · 손인사", "포토존 인증샷", "피켓·쿠폰 전달"],
    sizeSpec: "신장 170~180cm 기준 대형 인형탈",
    availabilityStatus: "예약 가능",
    isSample: true,
    visualTheme: {
      bgGradient: "from-slate-100 via-stone-100 to-amber-50/70",
      accentColor: "#F26430",
      badgeColor: "#0F172A",
      characterType: "hugmon",
    },
  },
  {
    id: "char-02",
    slug: "dino-green",
    name: "다이노 그린 (DINO)",
    englishName: "DINO GREEN",
    category: "동물",
    supplyType: "자체 확보",
    moodTags: ["시선 강탈", "댄스 퍼포먼스", "숏폼 인기"],
    recommendedEvents: ["신규 오픈 매장", "거리 퍼레이드", "학원가 홍보"],
    summary: "2m급 압도적 존재감과 반전 댄스로 번화가의 모든 시선을 집중시키는 공룡 캐릭터.",
    description:
      "등장과 동시에 스마트폰 카메라를 켜게 만드는 시선 집중형 캐릭터로, 율동 퍼포먼스와 거리 행진에서 최고의 화제성을 만듭니다.",
    features: [
      "2m급 볼륨감으로 번화가·사거리 시선 장악",
      "익살스러운 댄스 및 숏폼 챌린지 특화",
      "MZ세대 및 가족 고객 인증샷 선호도 1위",
    ],
    performances: ["코믹 댄스 · 챌린지", "거리 퍼레이드 선두", "매장 입구 집객"],
    sizeSpec: "약 2.1m 에어 조형 코스튬",
    availabilityStatus: "예약 가능",
    isSample: true,
    visualTheme: {
      bgGradient: "from-slate-100 via-emerald-50/50 to-sky-50/60",
      accentColor: "#0F172A",
      badgeColor: "#0F172A",
      characterType: "dino",
    },
  },
  {
    id: "char-03",
    slug: "honey-bear",
    name: "허니 베어 (HONEY BEAR)",
    englishName: "COZY HONEY BEAR",
    category: "귀여운 캐릭터",
    supplyType: "자체 확보",
    moodTags: ["포근함", "어린이 친화", "신뢰감"],
    recommendedEvents: ["소아과·치과 캠페인", "쇼핑몰 가족 행사", "학원 홍보"],
    summary: "부드럽고 온화한 인상으로 어린이·가족 고객에게 편안하게 다가가는 베어 캐릭터.",
    description:
      "병원, 학원, 쇼핑몰 등 친근함과 안심 이미지가 중요한 현장에서 아이들과 자연스러운 교감을 형성합니다.",
    features: [
      "차분하고 따뜻한 웜 베이지·허니 브라운 톤",
      "어린이·학부모 고객층의 높은 호감도",
      "실내 쇼핑몰 및 매장 웰컴 그리팅에 최적",
    ],
    performances: ["눈높이 인사 · 포옹", "어린이 하이파이브", "가족 기념촬영"],
    sizeSpec: "신장 165~178cm 기준 봉제 인형탈",
    availabilityStatus: "예약 가능",
    isSample: true,
    visualTheme: {
      bgGradient: "from-stone-100 via-amber-50/40 to-slate-100",
      accentColor: "#F26430",
      badgeColor: "#0F172A",
      characterType: "bear",
    },
  },
  {
    id: "char-04",
    slug: "peach-bunny",
    name: "피치 버니 (PEACH BUNNY)",
    englishName: "LOVELY PEACH BUNNY",
    category: "귀여운 캐릭터",
    supplyType: "외부 조달",
    moodTags: ["러블리", "감성 포토존", "기념일 특화"],
    recommendedEvents: ["카페·뷰티 오픈", "팝업스토어", "생일·프러포즈"],
    summary: "카페, 뷰티 팝업스토어, 기념일 서프라이즈 현장을 화사하게 연출하는 토끼 캐릭터.",
    description:
      "감성적인 브랜드 행사나 2인 패키지(BUSINESS) 구성 시 시각적 포인트를 더해주는 인기 파트너 캐릭터입니다.",
    features: [
      "소프트 로즈·화이트 톤의 세련된 비주얼",
      "선물·꽃다발·포토카드 전달 제스처 특화",
      "2인 조합 시 시각적 균형감 극대화",
    ],
    performances: ["기프트·카드 전달", "하트 제스처 · 포토타임", "매장 웰컴 그리팅"],
    sizeSpec: "귀 포함 약 195cm (파트너 조달)",
    availabilityStatus: "예약 가능",
    isSample: true,
    visualTheme: {
      bgGradient: "from-slate-100 via-rose-50/50 to-stone-100",
      accentColor: "#0F172A",
      badgeColor: "#0F172A",
      characterType: "bunny",
    },
  },
  {
    id: "char-05",
    slug: "winter-rudolph",
    name: "윈터 루돌프 & 산타",
    englishName: "SEASONAL FESTIVE DUO",
    category: "시즌 캐릭터",
    supplyType: "외부 조달",
    moodTags: ["크리스마스", "연말 대목", "시즌 한정"],
    recommendedEvents: ["연말 쇼핑몰·외식업", "크리스마스 행사", "겨울 프로모션"],
    summary: "연말연시·크리스마스 시즌 매장과 거리에 축제 무드를 즉시 완성하는 시즌 캐릭터.",
    description:
      "연말 대목을 앞둔 쇼핑몰, 외식업, 지역 축제를 위해 사전 예약 및 파트너 조달로 운영되는 시즌 특화 라인업입니다.",
    features: [
      "연말·크리스마스 즉각적인 시즌 테마 연출",
      "단독 또는 루돌프+산타 2인 패키지 구성",
      "시즌 성수기 사전 예약 필수",
    ],
    performances: ["캐럴 리듬 율동", "시즌 쿠폰·기프트 배포", "윈터 포토존 운영"],
    sizeSpec: "시즌 코스튬 세트 (사전 예약 조달)",
    availabilityStatus: "일정 확인 필요",
    isSample: true,
    visualTheme: {
      bgGradient: "from-slate-100 via-sky-50/60 to-stone-100",
      accentColor: "#F26430",
      badgeColor: "#0F172A",
      characterType: "rudolph",
    },
  },
  {
    id: "char-06",
    slug: "sunny-lion",
    name: "써니 라이온 (SUNNY LION)",
    englishName: "CHEER LEADER LION",
    category: "기타",
    supplyType: "외부 조달",
    moodTags: ["응원 퍼포먼스", "기업 행사", "퍼레이드"],
    recommendedEvents: ["기업 체육대회·송년회", "지역 축제·관공서", "대형 오픈식"],
    summary: "역동적인 응원 퍼포먼스로 기업 행사와 지역 축제의 열기를 끌어올리는 분위기 메이커.",
    description:
      "창립기념일, 사내 체육대회, 공공 캠페인 및 대형 퍼레이드에서 무대와 객석의 호응을 이끄는 엔터테이너 캐릭터입니다.",
    features: [
      "무대 시인성이 뛰어난 치어리더 콘셉트",
      "기업·관공서 행사에 어울리는 활기찬 톤앤매너",
      "다인원 PREMIUM 퍼레이드 중심 캐릭터",
    ],
    performances: ["응원 안무 · 하이파이브", "레크리에이션 보조", "무대 오프닝 · 단체 촬영"],
    sizeSpec: "신장 172~182cm 기준 활동형 인형탈",
    availabilityStatus: "예약 가능",
    isSample: true,
    visualTheme: {
      bgGradient: "from-stone-100 via-amber-50/50 to-slate-100",
      accentColor: "#0F172A",
      badgeColor: "#0F172A",
      characterType: "lion",
    },
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "svc-store-opening",
    slug: "store-opening",
    code: "STORE OPENING",
    title: "매장 · 쇼핑몰 오픈 이벤트",
    subtitle: "개업 첫날 시선 집중 · 매장 앞 줄 세우기",
    description:
      "신규 식당, 카페, 학원, 병원 앞에서 행인의 발걸음을 멈추고 오픈 인지도를 각인시킵니다.",
    targetCustomers: ["신규 음식점·카페·소매점", "신학기 수강생 모집 학원", "소아과·치과·동물병원"],
    activities: [
      "매장 정문·역 출구 거점 퍼포먼스",
      "하이파이브·포옹 및 피켓 노출",
      "오픈 할인 쿠폰·전단지 배포",
      "방문객 즉석 포토타임",
    ],
    operationSteps: [
      "유동인구 시간대·동선 분석",
      "맞춤 캐릭터 배정 (1~2명)",
      "우천 시 실내/처마 대체 동선 확보",
      "현장 실행 및 스틸컷 공유",
    ],
    recommendedPackage: "BUSINESS",
    iconName: "Store",
    accentColor: "#F26430",
  },
  {
    id: "svc-brand-promotion",
    slug: "brand-promotion",
    code: "BRAND PROMOTION",
    title: "브랜드 프로모션",
    subtitle: "SNS 인증샷을 부르는 오프라인 브랜드 접점",
    description:
      "팝업스토어, 신제품 출시, 시즌 캠페인 현장을 소비자가 스스로 찍고 공유하는 포토존으로 전환합니다.",
    targetCustomers: ["팝업스토어 운영 브랜드", "시즌 프로모션 쇼핑몰", "SNS 바이럴 기획 마케팅팀"],
    activities: [
      "브랜드 맞춤 캐릭터 그리팅",
      "해시태그·인증샷 참여 유도",
      "샘플·프로모션 기프트 전달",
      "2인 이상 캐릭터 시너지 연출",
    ],
    operationSteps: [
      "핵심 메시지(Key Message) 정의",
      "운영 계획서(SOP) 미션 설계",
      "매니저 동행 안전 군중 관리",
      "현장 미디어 및 결과 리포트 전달",
    ],
    recommendedPackage: "BUSINESS",
    iconName: "Sparkles",
    accentColor: "#F3C65F",
  },
  {
    id: "svc-festival-event",
    slug: "festival-event",
    code: "FESTIVAL & EVENT",
    title: "축제 · 지역 행사",
    subtitle: "관람객 참여와 현장 활기를 높이는 거리 퍼레이드",
    description:
      "지역 축제, 지자체·관공서 캠페인, 박람회 현장에서 시민들에게 즐거운 볼거리와 포토타임을 제공합니다.",
    targetCustomers: ["지역 축제·문화행사 주최사", "관공서·공공기관 캠페인", "박람회·전시 부스 운영사"],
    activities: [
      "지정 루트 캐릭터 거리 퍼레이드",
      "메인 포토존 상주 시민 촬영",
      "공익 캠페인 피켓·현장 이벤트 보조",
      "다수 캐릭터 교대 로테이션 운영",
    ],
    operationSteps: [
      "행사장 동선·대기 공간 점검",
      "캐릭터 및 안전 보조 인력 편성",
      "30~40분 활동 / 10~15분 휴식 실행",
      "관공서·기업 기준 정산 서류 대응",
    ],
    recommendedPackage: "PREMIUM",
    iconName: "PartyPopper",
    accentColor: "#38BDF8",
  },
  {
    id: "svc-corporate-event",
    slug: "corporate-event",
    code: "CORPORATE EVENT",
    title: "기업 사내 행사",
    subtitle: "창립기념일 · 체육대회 · 송년회 분위기 메이커",
    description:
      "출근길 웰컴 이벤트부터 타운홀 미팅, 체육대회, 패밀리데이까지 임직원의 미소와 참여를 이끌어냅니다.",
    targetCustomers: ["창립기념일·송년회 기획팀", "사내 체육대회·패밀리데이", "출근길 웰컴 캠페인"],
    activities: [
      "사옥 로비 출근길 웰컴 하이파이브",
      "무대 오프닝 등장 및 합동 댄스",
      "체육대회 응원 및 시상식 포토타임",
      "임직원 가족 초청 키즈 그리팅",
    ],
    operationSteps: [
      "행사 식순·출입 절차 사전 협의",
      "등장 타이밍·큐시트 설계",
      "현장 리허설 및 본 행사 수행",
      "사내 홍보용 사진·영상 촬영 협조",
    ],
    recommendedPackage: "PREMIUM",
    iconName: "Building2",
    accentColor: "#0F172A",
  },
  {
    id: "svc-special-event",
    slug: "special-event",
    code: "SPECIAL EVENT",
    title: "개인 · 특별 서프라이즈",
    subtitle: "생일 · 프러포즈 · 결혼식 맞춤형 방문 이벤트",
    description:
      "아이 생일 파티, 프러포즈, 결혼식 등 특별한 날 캐릭터가 깜짝 등장해 잊지 못할 추억을 선물합니다.",
    targetCustomers: ["어린이 생일·유치원 이벤트", "프러포즈·결혼식 축하 댄스", "졸업·입학 가족 기념일"],
    activities: [
      "약속 장소 서프라이즈 등장",
      "선물·꽃다발 전달 및 축하 율동",
      "가족·지인 기념사진 촬영",
    ],
    operationSteps: [
      "대상 연령·현장 공간 확인",
      "선물 인계 및 비밀 동선 협의",
      "맞춤 퍼포먼스 및 기념 촬영",
    ],
    recommendedPackage: "STARTER",
    iconName: "HeartHandshake",
    accentColor: "#F472B6",
  },
];

export const PACKAGES: PackageItem[] = [
  {
    id: "STARTER",
    name: "STARTER",
    subtitle: "단일 거점 집중 홍보용 실속형 패키지",
    priceText: "199,000원",
    priceNumber: 199000,
    characterCount: "캐릭터 1명",
    duration: "행사 2시간",
    recommended: false,
    summary: "소규모 신규 오픈 매장 앞 시선 집중과 전단지 배포를 위한 기본 구성입니다.",
    features: [
      "캐릭터 1명 투입",
      "기본 행사 2시간 운영 (휴식 포함)",
      "지정 구역 전단지·홍보물 배포",
      "손인사·하이파이브 등 현장 홍보",
      "사전 기본 동선·시간 협의",
    ],
    suitableFor: ["소규모 식당·카페 오픈", "학원 등하원 홍보", "개인 기념일 이벤트"],
    conditionNote: "부가세·출장비·세부 조건은 상담 시 안내드립니다.",
  },
  {
    id: "BUSINESS",
    name: "BUSINESS",
    subtitle: "2인 캐릭터 시너지 · 포토타임 주력 패키지",
    priceText: "349,000원",
    priceNumber: 349000,
    characterCount: "캐릭터 2명",
    duration: "행사 3시간",
    recommended: true,
    summary: "2인 캐릭터 호흡과 포토타임·SNS 이벤트로 거리 화제성을 극대화하는 추천 구성입니다.",
    features: [
      "캐릭터 2명 동시 투입 (조합 선택)",
      "기본 행사 3시간 운영 (휴식 포함)",
      "포토타임 및 즉석 촬영 프로그램",
      "SNS 인증샷 참여 이벤트 지원",
      "율동 퍼포먼스 및 피켓 노출",
      "맞춤 운영 계획서(SOP) 수립",
    ],
    suitableFor: ["매장 오픈 줄 세우기", "쇼핑몰 주말 집객", "병원·학원 시즌 홍보"],
    conditionNote: "부가세·출장비·추가 인력 등 세부 조건은 상담 시 안내드립니다.",
  },
  {
    id: "PREMIUM",
    name: "PREMIUM",
    subtitle: "다수 캐릭터 · 퍼레이드 · 맞춤형 기획 패키지",
    priceText: "별도 견적",
    priceNumber: null,
    characterCount: "캐릭터 3명+ 맞춤",
    duration: "일정 맞춤 협의",
    recommended: false,
    summary: "지역 축제, 기업 행사, 대형 프로모션을 위해 기획부터 안전 관리까지 맞춤 설계합니다.",
    features: [
      "캐릭터 3명 이상 또는 맞춤 편성",
      "거리 퍼레이드 및 무대 연출 기획",
      "전담 현장 매니저(안전·진행) 배치",
      "맞춤형 퍼포먼스 프로그램 구성",
      "현장 사진·숏폼 영상 촬영 옵션",
      "기업·관공서 맞춤 제안·정산 지원",
    ],
    suitableFor: ["지역 축제·관공서 행사", "기업 창립기념일·체육대회", "대형 팝업·쇼핑몰 행사"],
    conditionNote: "행사 규모·지역·시간·옵션에 따라 맞춤 견적을 산출합니다.",
  },
];

export const PACKAGE_ADDONS = [
  {
    title: "캐릭터 인원 추가",
    description: "기본 인원 외 추가 캐릭터 투입으로 현장 볼륨감 확대",
    pricePolicy: "상담 시 안내",
  },
  {
    title: "행사 시간 연장",
    description: "기본 제공 시간(2시간/3시간) 이후 시간 단위 연장",
    pricePolicy: "상담 시 안내",
  },
  {
    title: "현장 매니저 (보조 인력)",
    description: "안전 동선 확보, 홍보물 배포, 포토타임 촬영 전담 보조",
    pricePolicy: "상담 시 안내",
  },
  {
    title: "홍보 피켓·인쇄물 제작",
    description: "손피켓, 오픈 보드, 배포용 카드 디자인 및 제작 지원",
    pricePolicy: "상담 시 안내",
  },
  {
    title: "사진 · 숏폼 영상 촬영",
    description: "릴스·쇼츠·홍보용 현장 반응 사진 및 영상 촬영",
    pricePolicy: "상담 시 안내",
  },
  {
    title: "맞춤형 퍼포먼스 기획",
    description: "특정 챌린지 안무 및 사내 행사 서프라이즈 연출",
    pricePolicy: "상담 시 안내",
  },
];

export const PORTFOLIOS: PortfolioItem[] = [
  {
    id: "pf-01",
    slug: "gangnam-pasta-grand-opening",
    title: "강남 파스타 전문점 오픈 그리팅 & 포토존",
    category: "매장 오픈",
    eventDate: "2026.10 (샘플 사례)",
    location: "서울 강남구 역삼동",
    packageUsed: "BUSINESS",
    charactersUsed: ["허그몬 (HUGMON)", "다이노 그린 (DINO)"],
    summary:
      "점심·저녁 피크타임 역 출구 및 매장 앞 2인 퍼포먼스와 오픈 쿠폰 배포 구성 예시.",
    activitiesProvided: [
      "캐릭터 2종 3시간 교대 퍼포먼스",
      "매장 입구 포토존 및 즉석 촬영",
      "오픈 할인 메시지 카드 배포",
    ],
    operationNote: "서비스 이해를 돕기 위한 샘플 연출 사례입니다.",
    isSample: true,
    mediaType: "PHOTO",
    visualTheme: {
      bg: "from-slate-100 to-amber-50/70",
      accent: "#F26430",
      characterType: "hugmon",
    },
  },
  {
    id: "pf-02",
    slug: "kids-dental-clinic-smile-campaign",
    title: "어린이 치과 '무섭지 않은 병원' 스마일 캠페인",
    category: "매장 오픈",
    eventDate: "2026.09 (샘플 사례)",
    location: "경기 성남시 분당구",
    packageUsed: "STARTER",
    charactersUsed: ["허니 베어 (HONEY BEAR)"],
    summary:
      "주말 오전 내원 시간대 병원 입구에서 어린이 눈높이 인사와 포토타임을 진행한 구성 예시.",
    activitiesProvided: [
      "비접촉 안전 원칙 기반 어린이 하이파이브",
      "학부모 안내 리플렛·기념품 전달",
      "대기실 입구 포토타임",
    ],
    operationNote: "샘플 연출 사례입니다. 어린이 행사는 비접촉 안전 수칙을 최우선 적용합니다.",
    isSample: true,
    mediaType: "PHOTO",
    visualTheme: {
      bg: "from-stone-100 to-amber-50/50",
      accent: "#0F172A",
      characterType: "bear",
    },
  },
  {
    id: "pf-03",
    slug: "autumn-local-festival-character-parade",
    title: "가을 거리 문화축제 캐릭터 퍼레이드 & 포토존",
    category: "축제·지역 행사",
    eventDate: "2026.10 (샘플 사례)",
    location: "서울 마포구 보행자 거리",
    packageUsed: "PREMIUM",
    charactersUsed: ["허그몬 (HUGMON)", "다이노 그린 (DINO)", "써니 라이온 (SUNNY LION)"],
    summary:
      "보행자 거리 3종 캐릭터 퍼레이드 행진 및 메인 무대 시민 포토타임 연출 예시.",
    activitiesProvided: [
      "캐릭터 3종 + 안전 매니저 2명 거리 행진",
      "30분 활동 / 15분 휴식 로테이션 운영",
      "축제 피켓 홍보 및 시민 하이파이브",
    ],
    operationNote: "샘플 연출 사례입니다.",
    isSample: true,
    mediaType: "SHORT_VIDEO",
    visualTheme: {
      bg: "from-slate-100 to-sky-50/70",
      accent: "#0F172A",
      characterType: "dino",
    },
  },
  {
    id: "pf-04",
    slug: "cosmetics-popup-sns-photo-event",
    title: "성수동 뷰티 팝업스토어 SNS 인증샷 프로모션",
    category: "브랜드 프로모션",
    eventDate: "2026.10 (샘플 사례)",
    location: "서울 성동구 성수동",
    packageUsed: "BUSINESS",
    charactersUsed: ["피치 버니 (PEACH BUNNY)", "허그몬 (HUGMON)"],
    summary:
      "팝업 대기 동선에서 캐릭터 포토타임 및 해시태그 업로드 이벤트를 진행한 구성 예시.",
    activitiesProvided: [
      "피치 버니 & 허그몬 2인 웰컴 그리팅",
      "대기 고객 포토타임 및 제스처 소통",
      "SNS 업로드 고객 기프트 교환 안내",
    ],
    operationNote: "샘플 연출 사례입니다.",
    isSample: true,
    mediaType: "SHORT_VIDEO",
    visualTheme: {
      bg: "from-slate-100 to-rose-50/60",
      accent: "#F26430",
      characterType: "bunny",
    },
  },
  {
    id: "pf-05",
    slug: "it-company-foundation-day-welcome",
    title: "IT 기업 창립기념일 출근길 웰컴 & 타운홀 오프닝",
    category: "기업 행사",
    eventDate: "2026.11 (샘플 사례)",
    location: "서울 구로구 사옥 로비",
    packageUsed: "PREMIUM",
    charactersUsed: ["써니 라이온 (SUNNY LION)", "허그몬 (HUGMON)"],
    summary:
      "사옥 로비 출근길 하이파이브 그리팅 및 오후 사내 행사 오프닝 댄스 구성 예시.",
    activitiesProvided: [
      "출근 시간대 로비 그리팅·기념품 전달",
      "타운홀 미팅 오프닝 무대 등장",
      "부서별 기념 촬영 포토존",
    ],
    operationNote: "샘플 연출 사례입니다.",
    isSample: true,
    mediaType: "PHOTO",
    visualTheme: {
      bg: "from-stone-100 to-slate-200/60",
      accent: "#0F172A",
      characterType: "lion",
    },
  },
  {
    id: "pf-06",
    slug: "winter-shopping-mall-festive-greeting",
    title: "복합 쇼핑몰 윈터 페스티벌 산타 & 루돌프 그리팅",
    category: "특별 이벤트",
    eventDate: "2026.12 시즌 (샘플 사례)",
    location: "수도권 복합 쇼핑몰",
    packageUsed: "BUSINESS",
    charactersUsed: ["윈터 루돌프 & 산타"],
    summary:
      "연말 쇼핑몰 가족 방문객 대상 실내 퍼레이드 및 크리스마스 포토타임 구성 예시.",
    activitiesProvided: [
      "산타 & 루돌프 2인 3시간 운영",
      "중앙 광장 포토타임 및 엽서 증정",
      "입점 매장 할인 쿠폰북 배포",
    ],
    operationNote: "샘플 연출 사례입니다.",
    isSample: true,
    mediaType: "PHOTO",
    visualTheme: {
      bg: "from-slate-100 to-sky-100/50",
      accent: "#F26430",
      characterType: "rudolph",
    },
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    code: "CONSULTATION",
    title: "상담 문의 접수",
    description: "일정·장소·행사 목적 접수 및 1차 가용성 확인",
    details: ["행사 목적 파악", "일정·지역 확인", "빠른 가능 여부 회신"],
  },
  {
    step: "02",
    code: "PLANNING",
    title: "운영 계획(SOP) 협의",
    description: "투입 캐릭터 선정 및 시간대별 거점 동선·메시지 설계",
    details: ["캐릭터 조합 확정", "피크타임 동선 설계", "우천 대체안 협의"],
  },
  {
    step: "03",
    code: "PREPARATION",
    title: "계약 및 인력 준비",
    description: "서면 계약·계약금 확정 후 의상 점검 및 숙련 연기자 배정",
    details: ["서면 계약 체결", "코스튬 상태 점검", "현장 요원 안전 교육"],
  },
  {
    step: "04",
    code: "PERFORMANCE",
    title: "현장 이벤트 실행",
    description: "5대 안전 수칙 및 휴식 사이클 준수 하에 퍼포먼스 진행",
    details: ["사전 도착·동선 체크", "포토타임·홍보 수행", "주기적 휴식·컨디션 관리"],
  },
  {
    step: "05",
    code: "COMPLETION",
    title: "결과 공유 및 정산",
    description: "현장 활동 사진·결과 공유 및 약정 잔금 정산 완료",
    details: ["현장 스틸컷 공유", "운영 결과 브리핑", "잔금 정산 마무리"],
  },
];

export const SOP_CHECKLIST = [
  {
    title: "01. 미션 목표 (Objective)",
    desc: "전단지 배포량, 포토타임 유도, 오픈 집객 등 핵심 목표 정의",
  },
  {
    title: "02. 시간 및 거점 (Time & Place)",
    desc: "피크타임 시간대별 활동 거점(역 출구, 매장 정문 등) 지정",
  },
  {
    title: "03. 캐릭터 역할 (Role)",
    desc: "캐릭터별 주 역할 분담 (예: 시선 집중 율동 vs 포토타임·배포)",
  },
  {
    title: "04. 핵심 메시지 (Key Message)",
    desc: "피켓·카드로 전달할 한 줄 홍보 문구 확정",
  },
  {
    title: "05. 돌발 대응 (Contingency)",
    desc: "우천 시 실내/처마 전환, 인파 밀집 시 동선 조정 기준 합의",
  },
  {
    title: "06. 결과 확인 (Review)",
    desc: "현장 스틸컷, 배포 수량 등 종료 후 결과 공유 방식 합의",
  },
];

export const SAFETY_RULES = [
  {
    number: "01 · 비접촉 원칙",
    title: "절대 먼저 만지지 않습니다",
    description:
      "어린이가 놀라지 않도록 먼저 신체 접촉을 하지 않으며, 밝은 제스처로 스스로 다가오도록 유도합니다.",
  },
  {
    number: "02 · 컨디션 관리",
    title: "30~40분 활동 · 10~15분 휴식",
    description:
      "온열 사고 예방과 최상의 퍼포먼스 유지를 위해 주기적 휴식과 수분 섭취를 의무화합니다.",
  },
  {
    number: "03 · 판타지 유지",
    title: "인형탈 내 발화 금지 (과묵함)",
    description:
      "캐릭터의 신비감을 지키기 위해 말을 하지 않고 오직 몸짓과 제스처, 피켓으로 소통합니다.",
  },
  {
    number: "04 · 시야·안전 확보",
    title: "위험 요소 경계 및 매니저 호흡",
    description:
      "제한된 시야를 보완하기 위해 계단·차량·장애물을 철저히 경계하며 안전 동선을 확보합니다.",
  },
  {
    number: "05 · 하이 텐션",
    title: "끊임없는 리듬과 긍정 에너지",
    description:
      "가만히 서 있지 않고 리듬을 타며 손인사와 하이파이브로 현장 활기를 유지합니다.",
  },
];
