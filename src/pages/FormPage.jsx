import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import SectionCard from "../components/SectionCard";
import SelectField from "../components/SelectField";
import ChipGroup from "../components/ChipGroup";
import "../components/formFields.css";

const steps = [
  "기본 정보",
  "검색 키워드",
  "실제 경험",
  "장점/아쉬운 점",
  "장소·사진·릴스",
  "최종 설정",
];

const categoryOptions = [
  "맛집/카페",
  "헬스장/PT/운동",
  "피부관리/에스테틱",
  "병원/클리닉",
  "숙소/여행",
  "제품 리뷰",
  "다이어트/건강",
  "생활용품",
  "여행/장소 후기",
  "기타",
];

const purposeOptions = [
  "내돈내산 후기",
  "체험단 후기",
  "방문 후기",
  "제품 리뷰",
  "정보성 후기",
  "비교 후기",
  "추천 리스트형",
  "경험 공유형",
];

const disclosureOptions = [
  "내돈내산",
  "광고 아님",
  "제품/서비스 제공받음",
  "체험단 후기",
  "협찬 포함",
  "아직 정하지 않음",
];

const searchIntentOptions = [
  "정보 탐색형: 가격/위치/이용방법을 알고 싶은 사람",
  "후기 확인형: 실제 경험을 보고 싶은 사람",
  "비교형: 여러 후보 중 고르는 사람",
  "방문 직전형: 주차/예약/운영시간이 궁금한 사람",
  "구매 고민형: 살지 말지 고민하는 사람",
];

const relatedKeywordOptions = [
  "주차",
  "가격",
  "예약",
  "영업시간",
  "위치",
  "메뉴",
  "시설",
  "분위기",
  "친절한 상담",
  "초보 추천",
  "가성비",
  "재방문",
  "사진 맛집",
  "후기",
  "추천",
  "웨이팅",
  "이벤트",
  "할인",
];

const situationOptions = [
  "처음 방문",
  "재방문",
  "예약 후 방문",
  "즉흥 방문",
  "검색 후 방문",
  "지인 추천으로 방문",
  "부모님과 방문",
  "친구와 방문",
  "혼자 방문",
  "퇴근 후 방문",
  "주말 방문",
  "여행 중 방문",
  "다이어트 중",
  "운동 초보",
];

const emotionOptions = [
  "생각보다 만족한",
  "기대 이상",
  "솔직히 놀란",
  "의외로 괜찮았던",
  "재방문하고 싶은",
  "조금 아쉬웠던",
  "부담 없이 좋았던",
  "초보자도 편한",
  "깔끔해서 좋았던",
  "친절해서 기억나는",
  "숨은 곳 발견한 느낌",
  "돈 아깝지 않았던",
];

const targetReaderOptions = [
  "처음 방문 전 후기를 찾는 사람",
  "근처에서 갈 곳을 찾는 사람",
  "가격과 위치를 비교하는 사람",
  "실제 후기를 보고 싶은 사람",
  "초보자 입장에서 정보를 원하는 사람",
  "부모님과 함께 갈 곳을 찾는 사람",
  "직장인 루틴에 맞는 곳을 찾는 사람",
  "가성비 좋은 곳을 찾는 사람",
  "실패 없는 선택을 하고 싶은 사람",
];

const visitTimeOptions = [
  "평일 오전",
  "평일 오후",
  "평일 저녁",
  "주말 오전",
  "주말 오후",
  "주말 저녁",
  "정확히 기억나지 않음",
];

const companionOptions = [
  "혼자",
  "친구와 함께",
  "부모님과 함께",
  "연인과 함께",
  "가족과 함께",
  "직장 동료와 함께",
  "해당 없음",
];

const beforeConcernOptions = [
  "후기가 적어서 걱정됨",
  "가격이 궁금했음",
  "주차가 걱정됨",
  "위치가 헷갈릴까 걱정됨",
  "사람이 많을까 걱정됨",
  "초보자라 부담스러웠음",
  "기대가 크지 않았음",
  "특별한 걱정 없음",
];

const firstImpressionOptions = [
  "생각보다 깔끔했음",
  "입구부터 찾기 쉬웠음",
  "분위기가 편안했음",
  "직원이 친절했음",
  "생각보다 넓었음",
  "사진보다 실제가 나았음",
  "처음에는 평범해 보였음",
  "조금 어색했지만 금방 괜찮아짐",
];

const strengthOptions = [
  "위치가 좋음",
  "공간이 깔끔함",
  "직원이 친절함",
  "가격이 합리적임",
  "초보자도 이용하기 쉬움",
  "시설/구성이 좋음",
  "사진 찍기 좋음",
  "설명이 자세함",
  "예약이 편함",
  "분위기가 편안함",
  "재방문하고 싶음",
  "동선이 편함",
  "대기 시간이 길지 않음",
  "정보 안내가 명확함",
];

const concernOptions = [
  "후기가 아직 많지 않음",
  "늦게 가면 선택지가 적을 수 있음",
  "주차가 애매할 수 있음",
  "피크 시간에는 사람이 많을 수 있음",
  "가격 정보 확인이 필요함",
  "예약이 필요할 수 있음",
  "공간이 생각보다 작을 수 있음",
  "처음 가면 위치가 헷갈릴 수 있음",
  "운영시간 확인 필요",
  "인기 메뉴/시간대는 미리 확인 필요",
  "특별한 아쉬움은 크지 않음",
];

const satisfactionOptions = [
  "매우 만족",
  "만족",
  "보통 이상",
  "아쉬움도 있지만 괜찮음",
  "재방문은 고민됨",
];

const revisitOptions = [
  "재방문 의사 있음",
  "상황 되면 재방문",
  "한 번쯤은 추천",
  "비슷한 선택지가 있으면 비교 후 결정",
  "재방문은 아직 고민",
];

const priceRangeOptions = [
  "가격 정보 없음",
  "가성비 좋음",
  "보통 수준",
  "가격은 있는 편이지만 만족",
  "이벤트/할인 적용",
  "상담 후 안내 필요",
];

const parkingOptions = [
  "주차 가능",
  "무료주차 가능",
  "근처 공영주차장 이용",
  "주차 공간 협소",
  "대중교통 추천",
  "주차 정보 확인 필요",
  "해당 없음",
];

const reservationOptions = [
  "예약 없이 방문 가능",
  "네이버 예약 가능",
  "전화 예약 필요",
  "방문 전 문의 추천",
  "현장 결제 가능",
  "사전 예약 필수",
  "정보 확인 필요",
];

const photoShotOptions = [
  "외관/입구 사진",
  "내부 공간 사진",
  "메뉴판/가격표 사진",
  "제품 클로즈업",
  "이용 전 사진",
  "이용 후 사진",
  "주차/가는 길 사진",
  "직접 먹거나 사용하는 장면",
  "상담/안내 공간",
  "영수증/예약 내역",
  "분위기 컷",
  "마무리 인증샷",
];

const hookStyleOptions = [
  "반전형: 기대 안 했는데 생각보다 좋았던 이야기",
  "공감형: 나 같은 사람 많을 것 같아서 쓰는 이야기",
  "문제해결형: 고민하다가 찾은 해결 후기",
  "비교형: 다른 곳과 비교해서 느낀 차이",
  "실패방지형: 가기 전에 알면 좋은 정보",
];

const toneOptions = [
  "20~30대 여성 블로거의 친근한 후기 말투",
  "이모티콘을 자연스럽게 섞은 밝은 말투",
  "솔직한 내돈내산 후기 말투",
  "친구에게 추천하듯 편안한 말투",
  "유머 있고 가벼운 말투",
  "정보를 깔끔하게 정리하는 말투",
  "전문적이지만 쉽게 설명하는 말투",
];

const wordCountOptions = ["1000자", "1500자", "1800자", "2000자", "2500자"];

const reelsStyleOptions = [
  "브이로그형",
  "정보 전달형",
  "솔직 후기형",
  "비교형",
  "웃긴 썰형",
  "감성 기록형",
];

const reelsGoalOptions = [
  "조회수 유도",
  "저장 유도",
  "댓글 유도",
  "방문 유도",
  "구매 유도",
  "공감 유도",
];

const initialFormData = {
  // 1단계 기본 정보
  topic: "",
  placeName: "",
  category: "",
  purpose: "",
  disclosureType: "내돈내산",

  // 2단계 검색 키워드
  mainKeyword: "",
  localKeyword: "",
  searchIntent: "",
  relatedKeyword: [],
  customRelatedKeyword: "",
  situationKeyword: [],
  customSituationKeyword: "",
  emotionKeyword: [],
  customEmotionKeyword: "",
  targetReader: [],
  customTargetReader: "",

  // 3단계 실제 경험
  visitTime: "",
  companion: "",
  beforeConcern: [],
  firstImpression: [],
  visitReason: "",
  actualFlow: "",
  memorableMoment: "",
  realExperienceDetail: "",

  // 4단계 장점/아쉬운 점
  selectedStrengths: [],
  goodPointDetail: "",
  bestPoint: "",
  selectedConcerns: [],
  badPointDetail: "",
  cautionPoint: "",
  satisfaction: "만족",
  revisitIntention: "상황 되면 재방문",

  // 5단계 장소·사진·릴스
  placeAddress: "",
  priceRange: "가격 정보 없음",
  priceDetail: "",
  operatingHours: "",
  parkingInfoChoice: "주차 정보 확인 필요",
  reservationInfoChoice: "정보 확인 필요",
  eventInfo: "",
  placeInfoDetail: "",
  photoShots: [],
  customPhoto: "",
  photoOrder: "",
  photoDescriptionDetail: "",
  reelsStyle: "솔직 후기형",
  reelsGoal: "저장 유도",

  // 6단계 최종 설정
  tone: "20~30대 여성 블로거의 친근한 후기 말투",
  wordCount: "1800자",
  hookStyle: "",
  hookPoint: "",
  uniquePoint: "",
  mustInclude: "",
  avoidPoint: "",
};

const requiredFieldsByStep = {
  0: {
    topic: "글 주제를 입력해주세요.",
    purpose: "콘텐츠 목적을 선택해주세요.",
  },
  1: {
    mainKeyword: "대표 키워드를 입력해주세요.",
    localKeyword: "지역 키워드를 입력해주세요.",
  },
  2: {
    realExperienceDetail: "실제 경험을 한두 문장이라도 입력해주세요.",
  },
  3: {
    goodPointDetail: "좋았던 점을 한두 문장이라도 입력해주세요.",
    badPointDetail: "아쉬웠던 점을 한두 문장이라도 입력해주세요.",
  },
  5: {
    tone: "원하는 톤을 선택해주세요.",
    wordCount: "원하는 글자 수를 선택해주세요.",
  },
};

function FormPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const joinArray = (value) => {
    if (Array.isArray(value)) return value.join(", ");
    return value || "";
  };

  const combineText = (items) => {
    return items
      .filter((item) => item && String(item).trim() !== "")
      .join("\n");
  };

  const combineInline = (items) => {
    return items
      .filter((item) => item && String(item).trim() !== "")
      .join(", ");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleChipChange = (name, values) => {
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const validateStep = (stepIndex) => {
    const requiredFields = requiredFieldsByStep[stepIndex] || {};
    const newErrors = {};

    Object.entries(requiredFields).forEach(([fieldName, message]) => {
      const value = formData[fieldName];

      if (!value || String(value).trim() === "") {
        newErrors[fieldName] = message;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (!isValid) return;

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildPromptData = () => {
    const situationKeyword = combineInline([
      joinArray(formData.situationKeyword),
      formData.customSituationKeyword,
      formData.visitTime,
      formData.companion,
      joinArray(formData.beforeConcern),
    ]);

    const relatedKeyword = combineInline([
      formData.category,
      formData.searchIntent,
      joinArray(formData.relatedKeyword),
      formData.customRelatedKeyword,
    ]);

    const emotionKeyword = combineInline([
      joinArray(formData.emotionKeyword),
      formData.customEmotionKeyword,
      joinArray(formData.firstImpression),
      formData.satisfaction,
    ]);

    const targetReader = combineInline([
      joinArray(formData.targetReader),
      formData.customTargetReader,
      formData.revisitIntention,
    ]);

    const hookPoint = combineText([
      formData.hookStyle && `도입부 스타일: ${formData.hookStyle}`,
      formData.hookPoint && `흥미 포인트: ${formData.hookPoint}`,
      formData.visitReason && `방문/구매 이유: ${formData.visitReason}`,
      joinArray(formData.beforeConcern) &&
        `방문 전 걱정/기대: ${joinArray(formData.beforeConcern)}`,
    ]);

    const uniquePoint = combineText([
      formData.uniquePoint && `반전/특이점: ${formData.uniquePoint}`,
      formData.memorableMoment && `기억에 남는 순간: ${formData.memorableMoment}`,
      joinArray(formData.firstImpression) &&
        `첫인상: ${joinArray(formData.firstImpression)}`,
      formData.bestPoint && `가장 좋았던 한 가지: ${formData.bestPoint}`,
    ]);

    const realExperience = combineText([
      formData.visitTime && `방문/사용 시간대: ${formData.visitTime}`,
      formData.companion && `동행 여부: ${formData.companion}`,
      formData.visitReason && `방문/구매 이유: ${formData.visitReason}`,
      formData.actualFlow && `이용 흐름: ${formData.actualFlow}`,
      formData.memorableMoment && `기억에 남는 순간: ${formData.memorableMoment}`,
      formData.realExperienceDetail &&
        `실제 경험 상세: ${formData.realExperienceDetail}`,
    ]);

    const goodPoint = combineText([
      joinArray(formData.selectedStrengths) &&
        `선택한 장점: ${joinArray(formData.selectedStrengths)}`,
      formData.goodPointDetail && `좋았던 점 상세: ${formData.goodPointDetail}`,
      formData.bestPoint && `가장 만족했던 한 가지: ${formData.bestPoint}`,
      `전체 만족도: ${formData.satisfaction}`,
      `재방문 의사: ${formData.revisitIntention}`,
    ]);

    const badPoint = combineText([
      joinArray(formData.selectedConcerns) &&
        `선택한 아쉬운 점: ${joinArray(formData.selectedConcerns)}`,
      formData.badPointDetail && `아쉬웠던 점 상세: ${formData.badPointDetail}`,
      formData.cautionPoint && `방문/구매 전 참고할 점: ${formData.cautionPoint}`,
    ]);

    const placeInfo = combineText([
      formData.category && `카테고리: ${formData.category}`,
      formData.disclosureType && `후기 유형/고지: ${formData.disclosureType}`,
      formData.placeAddress && `주소/위치: ${formData.placeAddress}`,
      `가격/비용 느낌: ${formData.priceRange}`,
      formData.priceDetail && `가격 상세: ${formData.priceDetail}`,
      formData.operatingHours && `운영시간: ${formData.operatingHours}`,
      `주차 정보: ${formData.parkingInfoChoice}`,
      `예약/이용 방법: ${formData.reservationInfoChoice}`,
      formData.eventInfo && `이벤트/할인 정보: ${formData.eventInfo}`,
      formData.placeInfoDetail && `추가 정보: ${formData.placeInfoDetail}`,
    ]);

    const photoDescription = combineText([
      joinArray(formData.photoShots) &&
        `선택한 사진/영상 컷: ${joinArray(formData.photoShots)}`,
      formData.customPhoto && `추가 촬영 컷: ${formData.customPhoto}`,
      formData.photoOrder && `사진 배치 순서: ${formData.photoOrder}`,
      formData.photoDescriptionDetail &&
        `사진 설명 상세: ${formData.photoDescriptionDetail}`,
    ]);

    const writingStyleGuide = combineText([
      "20~30대 여성 블로거가 직접 경험하고 쓰는 듯한 자연스러운 후기 말투로 작성해주세요.",
      "딱딱한 설명문이나 광고 문구처럼 보이지 않게, 친구에게 이야기하듯 편안하게 작성해주세요.",
      "문장 사이에 기분을 표현하는 이모티콘을 적당히 섞어주세요. 예: 😊, 😆, 😂, 🥹, ✨, 👍, 💪, 🫶, 👀, 🤍, 📍, ✔️",
      "이모티콘은 문단마다 1~2개 정도만 자연스럽게 사용해주세요.",
      "과한 감탄사, 반복되는 이모티콘, 지나치게 광고 같은 표현은 피해주세요.",
      "실제 사람이 쓴 것처럼 살짝 고민했던 부분, 기대와 달랐던 점, 솔직한 감상을 포함해주세요.",
      "네이버 블로그 모바일 가독성을 위해 문단은 짧게 나누고, 중간중간 소제목을 넣어주세요.",
      formData.mustInclude && `꼭 포함할 내용: ${formData.mustInclude}`,
      formData.avoidPoint && `피하고 싶은 표현: ${formData.avoidPoint}`,
    ]);

    return {
      topic: formData.topic,
      placeName: formData.placeName,
      purpose: formData.purpose,
      mainKeyword: formData.mainKeyword,
      localKeyword: formData.localKeyword,
      situationKeyword,
      relatedKeyword,
      emotionKeyword,
      targetReader,
      tone: formData.tone,
      writingStyleGuide,
      mustInclude: formData.mustInclude,
      avoidPoint: formData.avoidPoint,
      hookPoint,
      uniquePoint,
      realExperience,
      goodPoint,
      badPoint,
      placeInfo,
      photoDescription,
      wordCount: formData.wordCount,
      reelsStyle: formData.reelsStyle,
      reelsGoal: formData.reelsGoal,
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateStep(currentStep);
    if (!isValid) return;

    const dataToSave = buildPromptData();

    localStorage.setItem("blogPromptInput", JSON.stringify(dataToSave));
    navigate("/result");
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <SectionCard
          title="1단계. 기본 정보"
          description="콘텐츠의 큰 방향을 정하는 단계입니다. 주제, 장소, 목적을 각각 따로 입력하거나 선택해주세요."
        >
          <InputField
            label="글 주제"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="예: 동래 헬스장 후기"
            required
            error={errors.topic}
            description="이번 콘텐츠가 다룰 핵심 주제입니다."
            example="동래 헬스장 후기 / 부산 빵집 내돈내산 / 마운자로 다이어트 후기"
          />

          <InputField
            label="장소명 / 제품명"
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
            placeholder="예: 모움피티 헬스&PT 동래명륜점"
            description="정확한 장소명이나 제품명을 알고 있다면 입력해주세요."
            example="메이노하마베이커리 / 더단백 프로틴 음료 / 동래 피부관리샵"
          />

          <SelectField
            label="콘텐츠 카테고리"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
            description="어떤 분야의 콘텐츠인지 선택해주세요."
          />

          <SelectField
            label="콘텐츠 목적"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            options={purposeOptions}
            required
            error={errors.purpose}
            description="글을 쓰는 목적을 선택해주세요."
          />

          <SelectField
            label="후기 유형 / 고지"
            name="disclosureType"
            value={formData.disclosureType}
            onChange={handleChange}
            options={disclosureOptions}
            description="내돈내산, 협찬, 체험단 여부를 선택해주세요."
          />
        </SectionCard>
      );
    }

    if (currentStep === 1) {
      return (
        <SectionCard
          title="2단계. 검색 키워드"
          description="검색 노출, 제목, 해시태그에 들어갈 키워드를 따로따로 설정합니다."
        >
          <InputField
            label="대표 키워드"
            name="mainKeyword"
            value={formData.mainKeyword}
            onChange={handleChange}
            placeholder="예: 동래 헬스장"
            required
            error={errors.mainKeyword}
            description="가장 노출시키고 싶은 핵심 검색어입니다."
            example="동래 헬스장 / 부산 피부관리 / 마운자로 식단 / 동래 빵집"
          />

          <InputField
            label="지역 키워드"
            name="localKeyword"
            value={formData.localKeyword}
            onChange={handleChange}
            placeholder="예: 부산 동래, 명륜동, 동래역"
            required
            error={errors.localKeyword}
            description="지역 검색에 잡히도록 구, 동, 역 이름을 입력해주세요."
          />

          <SelectField
            label="검색 의도"
            name="searchIntent"
            value={formData.searchIntent}
            onChange={handleChange}
            options={searchIntentOptions}
            description="독자가 어떤 목적으로 검색할지 선택해주세요."
          />

          <ChipGroup
            label="관련 키워드"
            name="relatedKeyword"
            selectedValues={formData.relatedKeyword}
            onChange={handleChipChange}
            options={relatedKeywordOptions}
            description="본문과 해시태그에 함께 사용할 보조 키워드를 선택해주세요."
          />

          <InputField
            label="관련 키워드 직접 추가"
            name="customRelatedKeyword"
            value={formData.customRelatedKeyword}
            onChange={handleChange}
            placeholder="예: 소금빵, PT상담, 윤곽관리, 복부관리"
            description="선택지에 없는 세부 키워드가 있다면 입력해주세요."
          />

          <ChipGroup
            label="상황 키워드"
            name="situationKeyword"
            selectedValues={formData.situationKeyword}
            onChange={handleChipChange}
            options={situationOptions}
            description="어떤 상황에서 방문하거나 사용했는지 선택해주세요."
          />

          <InputField
            label="상황 키워드 직접 추가"
            name="customSituationKeyword"
            value={formData.customSituationKeyword}
            onChange={handleChange}
            placeholder="예: 부모님 운동 시작용, 퇴근 후 방문"
            description="선택지에 없는 상황을 추가로 입력해주세요."
          />

          <ChipGroup
            label="감정/공감 키워드"
            name="emotionKeyword"
            selectedValues={formData.emotionKeyword}
            onChange={handleChipChange}
            options={emotionOptions}
            description="후기 글의 감정선을 만들어주는 키워드입니다."
          />

          <InputField
            label="감정 표현 직접 추가"
            name="customEmotionKeyword"
            value={formData.customEmotionKeyword}
            onChange={handleChange}
            placeholder="예: 기대 안 했는데 만족, 괜히 뿌듯했던"
            description="직접 느낀 감정을 한두 문장으로 적어주세요."
          />

          <ChipGroup
            label="타깃 독자"
            name="targetReader"
            selectedValues={formData.targetReader}
            onChange={handleChipChange}
            options={targetReaderOptions}
            description="이 글을 읽으면 좋을 사람을 선택해주세요."
          />

          <InputField
            label="타깃 독자 직접 추가"
            name="customTargetReader"
            value={formData.customTargetReader}
            onChange={handleChange}
            placeholder="예: 동래 근처에서 부모님 운동 장소를 찾는 사람"
            description="더 구체적인 독자가 있다면 입력해주세요."
          />
        </SectionCard>
      );
    }

    if (currentStep === 2) {
      return (
        <SectionCard
          title="3단계. 실제 경험"
          description="방문 전, 방문 중, 방문 후 경험을 나눠서 입력합니다."
        >
          <SelectField
            label="방문/사용 시간대"
            name="visitTime"
            value={formData.visitTime}
            onChange={handleChange}
            options={visitTimeOptions}
            description="언제 방문하거나 사용했는지 선택해주세요."
          />

          <SelectField
            label="동행 여부"
            name="companion"
            value={formData.companion}
            onChange={handleChange}
            options={companionOptions}
            description="누구와 함께했는지 선택해주세요."
          />

          <ChipGroup
            label="방문 전 걱정/기대"
            name="beforeConcern"
            selectedValues={formData.beforeConcern}
            onChange={handleChipChange}
            options={beforeConcernOptions}
            description="가기 전 궁금했거나 걱정했던 점을 선택해주세요."
          />

          <ChipGroup
            label="첫인상"
            name="firstImpression"
            selectedValues={formData.firstImpression}
            onChange={handleChipChange}
            options={firstImpressionOptions}
            description="처음 봤을 때 느낀 점을 선택해주세요."
          />

          <TextAreaField
            label="방문/구매 이유"
            name="visitReason"
            value={formData.visitReason}
            onChange={handleChange}
            placeholder="예: 부모님 운동할 곳을 찾다가 네이버 지도에서 보고 방문했다."
            description="왜 이 장소나 제품을 선택했는지 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="실제 이용 흐름"
            name="actualFlow"
            value={formData.actualFlow}
            onChange={handleChange}
            placeholder="예: 입구 확인 → 상담 → 내부 구경 → 가격 안내 → 이용 가능 시간 확인"
            description="방문하거나 사용한 과정을 순서대로 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="기억에 남는 순간"
            name="memorableMoment"
            value={formData.memorableMoment}
            onChange={handleChange}
            placeholder="예: 생각보다 공간이 넓고 직원 설명이 자세해서 놀랐다."
            description="가장 인상 깊었던 순간을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="실제 경험 상세"
            name="realExperienceDetail"
            value={formData.realExperienceDetail}
            onChange={handleChange}
            placeholder="예: 토요일 오후에 방문했고, 상담 후 내부를 둘러봤다. 생각보다 깔끔하고 넓어서 부모님도 부담 없어 보였다."
            required
            error={errors.realExperienceDetail}
            description="전체 경험을 한두 문장 이상으로 입력해주세요."
            rows={5}
          />
        </SectionCard>
      );
    }

    if (currentStep === 3) {
      return (
        <SectionCard
          title="4단계. 장점/아쉬운 점"
          description="좋았던 점과 아쉬웠던 점을 따로 입력해 실제 후기처럼 보이게 만듭니다."
        >
          <ChipGroup
            label="좋았던 포인트"
            name="selectedStrengths"
            selectedValues={formData.selectedStrengths}
            onChange={handleChipChange}
            options={strengthOptions}
            description="좋았던 점을 여러 개 선택해주세요."
          />

          <TextAreaField
            label="좋았던 점 상세"
            name="goodPointDetail"
            value={formData.goodPointDetail}
            onChange={handleChange}
            placeholder="예: 공간이 넓고 기구 간 간격이 여유 있었다. 직원이 초보자 기준으로 설명해줘서 좋았다."
            required
            error={errors.goodPointDetail}
            description="선택한 장점 중 가장 기억에 남는 부분을 적어주세요."
            rows={4}
          />

          <TextAreaField
            label="가장 만족했던 한 가지"
            name="bestPoint"
            value={formData.bestPoint}
            onChange={handleChange}
            placeholder="예: 부모님도 부담 없이 상담을 들을 수 있었던 점"
            description="가장 좋았던 점을 하나만 고르면 무엇인지 입력해주세요."
            rows={3}
          />

          <ChipGroup
            label="아쉬웠던 포인트"
            name="selectedConcerns"
            selectedValues={formData.selectedConcerns}
            onChange={handleChipChange}
            options={concernOptions}
            description="아쉬웠던 점을 선택해주세요."
          />

          <TextAreaField
            label="아쉬웠던 점 상세"
            name="badPointDetail"
            value={formData.badPointDetail}
            onChange={handleChange}
            placeholder="예: 오픈 초기라 아직 후기가 많지 않았고, 주차 정보는 미리 확인하는 게 좋을 것 같다."
            required
            error={errors.badPointDetail}
            description="큰 단점이 아니어도 괜찮습니다. 현실적인 참고점을 적어주세요."
            rows={4}
          />

          <TextAreaField
            label="방문/구매 전 참고할 점"
            name="cautionPoint"
            value={formData.cautionPoint}
            onChange={handleChange}
            placeholder="예: 방문 전 운영시간과 주차 가능 여부는 확인하는 게 좋다."
            description="독자가 미리 알면 좋은 정보를 입력해주세요."
            rows={3}
          />

          <SelectField
            label="전체 만족도"
            name="satisfaction"
            value={formData.satisfaction}
            onChange={handleChange}
            options={satisfactionOptions}
            description="전체적으로 얼마나 만족했는지 선택해주세요."
          />

          <SelectField
            label="재방문/재구매 의사"
            name="revisitIntention"
            value={formData.revisitIntention}
            onChange={handleChange}
            options={revisitOptions}
            description="마무리 총평에 들어갈 정보입니다."
          />
        </SectionCard>
      );
    }

    if (currentStep === 4) {
      return (
        <SectionCard
          title="5단계. 장소·사진·릴스 정보"
          description="독자가 오래 머무를 수 있도록 상세 정보와 촬영 정보를 입력합니다."
        >
          <InputField
            label="주소/위치"
            name="placeAddress"
            value={formData.placeAddress}
            onChange={handleChange}
            placeholder="예: 부산 동래구 동래로 41 1층"
            description="주소나 위치를 알고 있다면 입력해주세요."
          />

          <SelectField
            label="가격/비용 느낌"
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
            options={priceRangeOptions}
            description="정확한 가격을 몰라도 느낌을 선택하면 됩니다."
          />

          <InputField
            label="가격 상세"
            name="priceDetail"
            value={formData.priceDetail}
            onChange={handleChange}
            placeholder="예: 오픈 이벤트 할인 중, 가격은 상담 후 안내"
            description="가격, 할인, 이벤트 비용 정보를 입력해주세요."
          />

          <InputField
            label="운영시간"
            name="operatingHours"
            value={formData.operatingHours}
            onChange={handleChange}
            placeholder="예: 매일 10:00~22:00"
            description="운영시간을 알고 있다면 입력해주세요."
          />

          <SelectField
            label="주차 정보"
            name="parkingInfoChoice"
            value={formData.parkingInfoChoice}
            onChange={handleChange}
            options={parkingOptions}
            description="주차 가능 여부를 선택해주세요."
          />

          <SelectField
            label="예약/이용 방법"
            name="reservationInfoChoice"
            value={formData.reservationInfoChoice}
            onChange={handleChange}
            options={reservationOptions}
            description="예약이나 이용 방법을 선택해주세요."
          />

          <InputField
            label="이벤트/할인 정보"
            name="eventInfo"
            value={formData.eventInfo}
            onChange={handleChange}
            placeholder="예: 오픈 이벤트 진행 중, 첫 방문 할인"
            description="이벤트나 할인 정보가 있다면 입력해주세요."
          />

          <TextAreaField
            label="장소/제품 추가 정보"
            name="placeInfoDetail"
            value={formData.placeInfoDetail}
            onChange={handleChange}
            placeholder="예: 동래역 근처라 접근성이 좋고, 큰길가 1층이라 찾기 쉬웠다."
            description="주소, 위치, 특징 외에 더 넣고 싶은 정보를 입력해주세요."
            rows={3}
          />

          <ChipGroup
            label="사진/영상 컷"
            name="photoShots"
            selectedValues={formData.photoShots}
            onChange={handleChipChange}
            options={photoShotOptions}
            description="가지고 있는 사진이나 찍을 예정인 장면을 선택해주세요."
          />

          <InputField
            label="추가 촬영 컷"
            name="customPhoto"
            value={formData.customPhoto}
            onChange={handleChange}
            placeholder="예: 부모님 상담받는 뒷모습, 빵 포장샷"
            description="선택지에 없는 사진이나 영상 장면을 적어주세요."
          />

          <TextAreaField
            label="사진 배치 순서"
            name="photoOrder"
            value={formData.photoOrder}
            onChange={handleChange}
            placeholder="예: 입구 → 내부 → 가격표 → 이용 장면 → 마무리 인증샷"
            description="사진을 어떤 순서로 넣을지 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="사진 설명 상세"
            name="photoDescriptionDetail"
            value={formData.photoDescriptionDetail}
            onChange={handleChange}
            placeholder="예: 내부 공간 사진에서는 기구 간격과 쾌적함을 강조하고 싶다."
            description="사진마다 설명하고 싶은 내용을 입력해주세요."
            rows={3}
          />

          <SelectField
            label="릴스 영상 스타일"
            name="reelsStyle"
            value={formData.reelsStyle}
            onChange={handleChange}
            options={reelsStyleOptions}
            description="영상의 전체 분위기를 선택해주세요."
          />

          <SelectField
            label="릴스 목적"
            name="reelsGoal"
            value={formData.reelsGoal}
            onChange={handleChange}
            options={reelsGoalOptions}
            description="조회수, 저장, 댓글, 방문 등 영상 목표를 선택해주세요."
          />
        </SectionCard>
      );
    }

    return (
      <SectionCard
        title="6단계. 최종 설정"
        description="글의 말투, 분량, 도입부 방향, 꼭 넣을 내용과 제외할 내용을 정합니다."
      >
        <SelectField
          label="원하는 톤"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          options={toneOptions}
          required
          error={errors.tone}
          description="20~30대 여성 후기 블로거 느낌, 이모티콘 사용 여부 등 글의 전체 말투를 선택해주세요."
        />

        <SelectField
          label="원하는 글자 수"
          name="wordCount"
          value={formData.wordCount}
          onChange={handleChange}
          options={wordCountOptions}
          required
          error={errors.wordCount}
          description="네이버 블로그 후기형 글은 1800자 전후가 무난합니다."
        />

        <SelectField
          label="도입부 스타일"
          name="hookStyle"
          value={formData.hookStyle}
          onChange={handleChange}
          options={hookStyleOptions}
          description="글을 어떤 방식으로 시작할지 선택해주세요."
        />

        <TextAreaField
          label="흥미 포인트"
          name="hookPoint"
          value={formData.hookPoint}
          onChange={handleChange}
          placeholder="예: 운동 안 하던 부모님 때문에 헬스장을 찾다가 발견했다."
          description="첫 문단에서 독자를 끌어당길 이야기를 입력해주세요."
          rows={3}
        />

        <TextAreaField
          label="반전/특이점"
          name="uniquePoint"
          value={formData.uniquePoint}
          onChange={handleChange}
          placeholder="예: 기대 안 했는데 시설이 생각보다 훨씬 깔끔했다."
          description="읽는 사람이 '오?' 하고 느낄 만한 특징을 입력해주세요."
          rows={3}
        />

        <TextAreaField
          label="꼭 포함할 내용"
          name="mustInclude"
          value={formData.mustInclude}
          onChange={handleChange}
          placeholder="예: 내돈내산임을 강조, 주차 정보, 오픈 이벤트"
          description="결과물에 꼭 들어가야 하는 내용을 입력해주세요."
          rows={3}
        />

        <TextAreaField
          label="피하고 싶은 표현"
          name="avoidPoint"
          value={formData.avoidPoint}
          onChange={handleChange}
          placeholder="예: 너무 광고 같은 표현, 과장된 추천 표현"
          description="결과물에서 피하고 싶은 표현이 있다면 입력해주세요."
          rows={3}
        />
      </SectionCard>
    );
  };

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <p style={styles.badge}>Naver Blog & Reels Prompt Maker</p>

          <h1 style={styles.title}>단계별 블로그/릴스 프롬프트 만들기</h1>

          <p style={styles.subtitle}>
            각 정보를 따로 입력하거나 선택하면, 블로그 글과 릴스 스크립트용
            프롬프트가 자동으로 정리됩니다.
          </p>
        </header>

        <div style={styles.progressBox}>
          <div style={styles.stepInfo}>
            <span style={styles.stepCount}>
              {currentStep + 1} / {steps.length}
            </span>
            <strong>{steps[currentStep]}</strong>
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progressPercent}%`,
              }}
            />
          </div>

          <div style={styles.stepList}>
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => {
                  if (index <= currentStep) {
                    setCurrentStep(index);
                    setErrors({});
                  }
                }}
                style={{
                  ...styles.stepChip,
                  ...(index === currentStep ? styles.activeStepChip : {}),
                  ...(index < currentStep ? styles.doneStepChip : {}),
                }}
              >
                {index + 1}. {step}
              </button>
            ))}
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div style={styles.errorSummary}>
            필수 항목이 비어 있어요. 빨간색으로 표시된 항목을 확인해주세요.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div style={styles.buttonGroup}>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                style={styles.secondaryButton}
              >
                이전
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                style={styles.submitButton}
              >
                다음
              </button>
            ) : (
              <button type="submit" style={styles.submitButton}>
                프롬프트 만들기
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f7f7f8",
    padding: "40px 18px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "26px",
  },
  badge: {
    display: "inline-block",
    padding: "7px 12px",
    backgroundColor: "#e8f5ec",
    color: "#1b8f43",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "14px",
  },
  title: {
    fontSize: "34px",
    lineHeight: "1.25",
    margin: "0 0 12px",
    color: "#111",
  },
  subtitle: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#555",
    margin: 0,
  },
  progressBox: {
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "22px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
  },
  stepInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
    fontSize: "16px",
  },
  stepCount: {
    padding: "5px 10px",
    borderRadius: "999px",
    backgroundColor: "#e8f5ec",
    color: "#1b8f43",
    fontSize: "13px",
    fontWeight: "800",
  },
  progressTrack: {
    width: "100%",
    height: "8px",
    backgroundColor: "#edf0f2",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "14px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#03c75a",
    borderRadius: "999px",
    transition: "width 0.2s ease",
  },
  stepList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  stepChip: {
    padding: "8px 10px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#666",
    fontSize: "13px",
    cursor: "pointer",
  },
  activeStepChip: {
    backgroundColor: "#03c75a",
    borderColor: "#03c75a",
    color: "#fff",
    fontWeight: "800",
  },
  doneStepChip: {
    borderColor: "#bfe8cf",
    backgroundColor: "#f2fbf5",
    color: "#1b8f43",
  },
  errorSummary: {
    padding: "14px 16px",
    borderRadius: "12px",
    backgroundColor: "#fff0f0",
    color: "#d92d20",
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "14px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "18px",
  },
  secondaryButton: {
    flex: 1,
    padding: "16px 18px",
    border: "1px solid #ddd",
    borderRadius: "14px",
    backgroundColor: "#fff",
    color: "#222",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
  },
  submitButton: {
    flex: 1,
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "#03c75a",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
  },
};

export default FormPage;