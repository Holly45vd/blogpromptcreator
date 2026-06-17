import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import SectionCard from "../components/SectionCard";
import SelectField from "../components/SelectField";
import ChipGroup from "../components/ChipGroup";
import "../components/formFields.css";

const steps = [
  "콘텐츠 기본 정보",
  "검색 의도·타깃 독자",
  "직접 경험·절차·수치",
  "장단점·비교·선택 기준",
  "정보 박스·사진 근거·릴스",
  "AI 브리핑형 출력 설정",
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

const contentTypeOptions = [
  "방문/체험 후기형",
  "제품 리뷰형",
  "정보 정리형",
  "비교 분석형",
  "추천 리스트형",
  "경험 기반 정보글",
  "다이어트/건강 기록형",
  "여행 기록형",
  "기존 글 업데이트형",
];

const contentGoalOptions = [
  "검색 유입",
  "체험단 제출",
  "정보성 글 축적",
  "개인 경험 기록",
  "수익형 콘텐츠",
  "브랜드/장소 소개",
  "릴스/숏폼 연동",
  "기존 글 보완",
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
  "가격 확인형",
  "후기 확인형",
  "비교형",
  "예약 전 확인형",
  "실패 방지형",
  "위치 확인형",
  "사용법 확인형",
  "부작용/주의사항 확인형",
  "추천 대상 확인형",
];

const readerCuriosityOptions = [
  "가격",
  "주차",
  "예약",
  "소요 시간",
  "대기 시간",
  "위치",
  "통증",
  "효과",
  "전후 차이",
  "사용 기간",
  "부작용",
  "웨이팅",
  "재방문 여부",
];

const readerAvoidanceOptions = [
  "광고글",
  "과장 후기",
  "가격 불명확",
  "사진만 많은 글",
  "정보 없는 감상문",
  "너무 긴 서론",
  "장점만 있는 글",
  "결론 없는 글",
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

const introStyleOptions = [
  "결론형",
  "실패방지형",
  "비교형",
  "숫자형",
  "문제해결형",
];

const yesNoOptions = ["예", "아니오"];

const aiToneRemoveOptions = ["보통", "강하게", "아주 강하게"];

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
  // 1단계 콘텐츠 기본 정보
  topic: "",
  placeName: "",
  category: "",
  purpose: "",
  contentType: "",
  contentGoal: "",
  disclosureType: "내돈내산",
  coreConclusion: "",
  recommendTarget: "",
  cautionTarget: "",

  // 2단계 검색 의도·타깃 독자
  mainKeyword: "",
  localKeyword: "",
  searchIntent: "",
  readerCuriosity: [],
  customReaderCuriosity: "",
  readerAvoidance: [],
  customReaderAvoidance: "",
  relatedKeyword: [],
  customRelatedKeyword: "",
  situationKeyword: [],
  customSituationKeyword: "",
  emotionKeyword: [],
  customEmotionKeyword: "",
  targetReader: [],
  customTargetReader: "",

  // 3단계 직접 경험·절차·수치
  visitTime: "",
  companion: "",
  beforeConcern: [],
  firstImpression: [],
  visitReason: "",
  actualFlow: "",
  memorableMoment: "",
  realExperienceDetail: "",
  experienceDate: "",
  beforeState: "",
  processSteps: "",
  stepDuration: "",
  experienceNumbers: "",
  unexpectedPoint: "",
  trialAndError: "",
  resultChange: "",

  // 4단계 장단점·비교·선택 기준
  selectedStrengths: [],
  goodPointDetail: "",
  bestPoint: "",
  selectedConcerns: [],
  badPointDetail: "",
  cautionPoint: "",
  satisfaction: "만족",
  revisitIntention: "상황 되면 재방문",
  comparisonTarget: "",
  comparisonCriteria: "",
  betterPoint: "",
  alternativeBetterCase: "",
  selectionStandard: "",

  // 5단계 정보 박스·사진 근거·릴스
  placeAddress: "",
  priceRange: "가격 정보 없음",
  priceDetail: "",
  operatingHours: "",
  parkingInfoChoice: "주차 정보 확인 필요",
  reservationInfoChoice: "정보 확인 필요",
  eventInfo: "",
  placeInfoDetail: "",
  infoBoxItems: "",
  checkBeforeVisit: "",
  relatedPostTopic: "",
  photoShots: [],
  customPhoto: "",
  photoOrder: "",
  photoDescriptionDetail: "",
  photoProofPoint: "",
  photoCaptionPurpose: "",
  reelsStyle: "정보 전달형",
  reelsGoal: "저장 유도",

  // 6단계 AI 브리핑형 출력 설정
  tone: "20~30대 여성 블로거의 친근한 후기 말투",
  wordCount: "1800자",
  hookStyle: "",
  hookPoint: "",
  uniquePoint: "",
  mustInclude: "",
  avoidPoint: "",
  introStyle: "결론형",
  includeInfoBox: "예",
  includeComparisonTable: "예",
  includeSummaryBox: "예",
  includeRelatedPost: "예",
  includeUpdateChecklist: "아니오",
  aiToneRemoveLevel: "강하게",
};

const requiredFieldsByStep = {
  0: {
    topic: "글 주제를 입력해주세요.",
    contentType: "콘텐츠 유형을 선택해주세요.",
    contentGoal: "콘텐츠 운영 목적을 선택해주세요.",
    coreConclusion: "첫 3줄에 들어갈 핵심 결론을 입력해주세요.",
    recommendTarget: "추천 대상을 입력해주세요.",
  },
  1: {
    mainKeyword: "대표 키워드를 입력해주세요.",
  },
  2: {
    realExperienceDetail: "실제 경험을 한두 문장이라도 입력해주세요.",
    experienceNumbers: "직접 경험 수치 3개 이상을 입력해주세요.",
  },
  3: {
    goodPointDetail: "좋았던 점 또는 핵심 장점을 입력해주세요.",
    badPointDetail: "아쉬웠던 점 또는 주의할 점을 입력해주세요.",
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

  const needsLocalKeyword =
    formData.contentType === "방문/체험 후기형" ||
    formData.contentType === "여행 기록형" ||
    formData.category === "맛집/카페" ||
    formData.category === "피부관리/에스테틱" ||
    formData.category === "헬스장/PT/운동" ||
    formData.category === "숙소/여행" ||
    formData.category === "여행/장소 후기";

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

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
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

    if (stepIndex === 1 && needsLocalKeyword) {
      if (!formData.localKeyword || formData.localKeyword.trim() === "") {
        newErrors.localKeyword = "지역 기반 콘텐츠는 지역 키워드를 입력해주세요.";
      }
    }

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
      formData.recommendTarget,
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
      formData.unexpectedPoint && `예상과 달랐던 점: ${formData.unexpectedPoint}`,
      formData.bestPoint && `가장 좋았던 한 가지: ${formData.bestPoint}`,
    ]);

    const realExperience = combineText([
      formData.visitTime && `방문/사용 시간대: ${formData.visitTime}`,
      formData.companion && `동행 여부: ${formData.companion}`,
      formData.visitReason && `방문/구매 이유: ${formData.visitReason}`,
      formData.actualFlow && `이용 흐름: ${formData.actualFlow}`,
      formData.processSteps && `단계별 진행 순서: ${formData.processSteps}`,
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
      formData.cautionTarget && `주의/비추천 대상: ${formData.cautionTarget}`,
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

    const aiBriefingIntro = combineText([
      formData.coreConclusion && `핵심 결론: ${formData.coreConclusion}`,
      formData.experienceNumbers && `직접 경험 수치: ${formData.experienceNumbers}`,
      formData.recommendTarget && `추천 대상: ${formData.recommendTarget}`,
      formData.cautionTarget && `주의/비추천 대상: ${formData.cautionTarget}`,
      formData.introStyle && `첫 3줄 스타일: ${formData.introStyle}`,
    ]);

    const readerIntentData = combineText([
      formData.searchIntent && `검색 의도: ${formData.searchIntent}`,
      joinArray(formData.readerCuriosity) &&
        `독자가 가장 궁금한 것: ${joinArray(formData.readerCuriosity)}`,
      formData.customReaderCuriosity &&
        `추가 궁금증: ${formData.customReaderCuriosity}`,
      joinArray(formData.readerAvoidance) &&
        `독자가 피하고 싶은 것: ${joinArray(formData.readerAvoidance)}`,
      formData.customReaderAvoidance &&
        `추가 회피 요소: ${formData.customReaderAvoidance}`,
    ]);

    const experienceEvidence = combineText([
      formData.experienceDate && `경험 날짜/시기: ${formData.experienceDate}`,
      formData.beforeState && `방문/사용 전 상태: ${formData.beforeState}`,
      formData.processSteps && `실제 진행 순서: ${formData.processSteps}`,
      formData.stepDuration && `단계별 소요 시간: ${formData.stepDuration}`,
      formData.experienceNumbers && `직접 경험 수치: ${formData.experienceNumbers}`,
      formData.unexpectedPoint && `예상과 달랐던 점: ${formData.unexpectedPoint}`,
      formData.trialAndError && `시행착오: ${formData.trialAndError}`,
      formData.resultChange && `결과/변화: ${formData.resultChange}`,
    ]);

    const comparisonData = combineText([
      formData.comparisonTarget && `비교 대상: ${formData.comparisonTarget}`,
      formData.comparisonCriteria && `비교 기준: ${formData.comparisonCriteria}`,
      formData.betterPoint &&
        `이곳/이 제품/이 방법이 더 나은 점: ${formData.betterPoint}`,
      formData.alternativeBetterCase &&
        `다른 선택지가 나을 수 있는 경우: ${formData.alternativeBetterCase}`,
      formData.selectionStandard && `최종 선택 기준: ${formData.selectionStandard}`,
    ]);

    const summaryBoxData = combineText([
      formData.infoBoxItems && `정보 박스에 넣을 내용: ${formData.infoBoxItems}`,
      formData.coreConclusion && `한 줄 결론: ${formData.coreConclusion}`,
      formData.goodPointDetail && `좋았던 점 요약: ${formData.goodPointDetail}`,
      formData.badPointDetail && `아쉬웠던 점 요약: ${formData.badPointDetail}`,
      formData.recommendTarget && `추천 대상: ${formData.recommendTarget}`,
      formData.checkBeforeVisit &&
        `방문/구매/사용 전 확인할 점: ${formData.checkBeforeVisit}`,
    ]);

    const imageEvidenceData = combineText([
      joinArray(formData.photoShots) &&
        `선택한 사진/영상 컷: ${joinArray(formData.photoShots)}`,
      formData.photoProofPoint &&
        `사진이 증명하는 정보: ${formData.photoProofPoint}`,
      formData.photoCaptionPurpose &&
        `사진별 캡션 목적: ${formData.photoCaptionPurpose}`,
      formData.photoOrder && `사진 배치 순서: ${formData.photoOrder}`,
      formData.photoDescriptionDetail &&
        `사진 설명 상세: ${formData.photoDescriptionDetail}`,
    ]);

    const outputSettingData = combineText([
      formData.includeInfoBox && `정보 박스 포함: ${formData.includeInfoBox}`,
      formData.includeComparisonTable &&
        `비교표 포함: ${formData.includeComparisonTable}`,
      formData.includeSummaryBox &&
        `하단 요약 박스 포함: ${formData.includeSummaryBox}`,
      formData.includeRelatedPost &&
        `관련 글 링크 문구 포함: ${formData.includeRelatedPost}`,
      formData.includeUpdateChecklist &&
        `기존 글 업데이트 체크리스트 포함: ${formData.includeUpdateChecklist}`,
      formData.aiToneRemoveLevel &&
        `AI 말투 제거 강도: ${formData.aiToneRemoveLevel}`,
    ]);

    const writingStyleGuide = combineText([
      "20~30대 여성 블로거가 직접 경험하고 쓰는 듯한 자연스러운 말투로 작성해주세요.",
      "첫 3줄 안에 핵심 결론, 직접 경험 수치, 추천 대상을 넣어주세요.",
      "딱딱한 설명문이나 광고 문구처럼 보이지 않게, 실제 경험에서 나온 판단처럼 작성해주세요.",
      "문단은 짧게 나누고, 중간중간 소제목·정보 박스·비교표·하단 요약 박스를 활용해주세요.",
      "과한 감탄사, 반복되는 이모티콘, 지나치게 광고 같은 표현은 피해주세요.",
      "건강·다이어트·의료 관련 내용은 효능이나 치료 효과를 단정하지 말고 개인 경험과 확인 필요 사항을 구분해주세요.",
      formData.mustInclude && `꼭 포함할 내용: ${formData.mustInclude}`,
      formData.avoidPoint && `피하고 싶은 표현: ${formData.avoidPoint}`,
      formData.aiToneRemoveLevel && `AI 말투 제거 강도: ${formData.aiToneRemoveLevel}`,
    ]);

    return {
      topic: formData.topic,
      placeName: formData.placeName,
      purpose: formData.purpose,
      contentType: formData.contentType,
      contentGoal: formData.contentGoal,
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
      aiBriefingIntro,
      readerIntentData,
      experienceEvidence,
      comparisonData,
      summaryBoxData,
      imageEvidenceData,
      outputSettingData,
      relatedPostTopic: formData.relatedPostTopic,
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
          title="1단계. 콘텐츠 기본 정보"
          description="글의 유형, 목적, 핵심 결론을 먼저 정합니다. 첫 3줄 품질을 결정하는 단계입니다."
        >
          <InputField
            label="글 주제"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="예: 용산왁싱 예약 전 확인할 점"
            required
            error={errors.topic}
            description="이번 콘텐츠가 다룰 핵심 주제입니다."
            example="마운자로 템퍼링 음식 / 치앙마이 숙소 비교 / 용산왁싱 후기"
          />

          <InputField
            label="장소명 / 제품명"
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
            placeholder="예: 뷔쥬아왁싱 / 나린트라 헤리티지 / 마운자로"
            description="정확한 장소명, 제품명, 브랜드명을 알고 있다면 입력해주세요."
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
            label="콘텐츠 유형"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            options={contentTypeOptions}
            required
            error={errors.contentType}
            description="후기형, 정보형, 비교형, 추천형 등 글의 구조를 선택해주세요."
          />

          <SelectField
            label="콘텐츠 운영 목적"
            name="contentGoal"
            value={formData.contentGoal}
            onChange={handleChange}
            options={contentGoalOptions}
            required
            error={errors.contentGoal}
            description="검색 유입, 체험단 제출, 정보성 글 축적 등 글의 목적을 선택해주세요."
          />

          <SelectField
            label="기존 콘텐츠 목적"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            options={purposeOptions}
            description="기존 후기/리뷰 목적도 함께 남겨두면 프롬프트가 더 안정적으로 작동합니다."
          />

          <SelectField
            label="후기 유형 / 고지"
            name="disclosureType"
            value={formData.disclosureType}
            onChange={handleChange}
            options={disclosureOptions}
            description="내돈내산, 협찬, 체험단 여부를 선택해주세요."
          />

          <TextAreaField
            label="핵심 결론"
            name="coreConclusion"
            value={formData.coreConclusion}
            onChange={handleChange}
            placeholder="예: 초보자도 상담받기 편했지만, 주차는 방문 전 확인하는 게 좋았다."
            required
            error={errors.coreConclusion}
            description="첫 3줄에 반드시 들어갈 결론입니다."
            rows={3}
          />

          <TextAreaField
            label="추천 대상"
            name="recommendTarget"
            value={formData.recommendTarget}
            onChange={handleChange}
            placeholder="예: 처음 방문 전 가격, 분위기, 소요 시간을 알고 싶은 사람"
            required
            error={errors.recommendTarget}
            description="이 글이 가장 도움 될 독자를 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="주의 / 비추천 대상"
            name="cautionTarget"
            value={formData.cautionTarget}
            onChange={handleChange}
            placeholder="예: 가격을 정확히 알고 바로 결정해야 하는 사람은 방문 전 문의가 필요하다."
            description="무조건 추천처럼 보이지 않게 균형을 잡아주는 항목입니다."
            rows={3}
          />
        </SectionCard>
      );
    }

    if (currentStep === 1) {
      return (
        <SectionCard
          title="2단계. 검색 의도·타깃 독자"
          description="대표 키워드뿐 아니라 독자가 실제로 궁금해하는 것과 피하고 싶은 글까지 설정합니다."
        >
          <InputField
            label="대표 키워드"
            name="mainKeyword"
            value={formData.mainKeyword}
            onChange={handleChange}
            placeholder="예: 용산왁싱"
            required
            error={errors.mainKeyword}
            description="가장 노출시키고 싶은 핵심 검색어입니다."
            example="동래 헬스장 / 마운자로 템퍼링 / 치앙마이 숙소"
          />

          <InputField
            label="지역 키워드"
            name="localKeyword"
            value={formData.localKeyword}
            onChange={handleChange}
            placeholder="예: 서울 용산, 이태원, 한남동"
            required={needsLocalKeyword}
            error={errors.localKeyword}
            description="방문형·지역 기반 콘텐츠일 때만 필수입니다."
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
            label="독자가 가장 궁금해할 정보"
            name="readerCuriosity"
            selectedValues={formData.readerCuriosity}
            onChange={handleChipChange}
            options={readerCuriosityOptions}
            description="첫 문단, 제목, 정보 박스에 반영할 핵심 궁금증입니다."
          />

          <InputField
            label="독자 궁금증 직접 추가"
            name="customReaderCuriosity"
            value={formData.customReaderCuriosity}
            onChange={handleChange}
            placeholder="예: 시술 후 바로 화장 가능한지, 예약 변경 가능한지"
            description="선택지에 없는 궁금증을 추가해주세요."
          />

          <ChipGroup
            label="독자가 피하고 싶은 글"
            name="readerAvoidance"
            selectedValues={formData.readerAvoidance}
            onChange={handleChipChange}
            options={readerAvoidanceOptions}
            description="광고글, 결론 없는 글처럼 피하고 싶은 요소를 선택해주세요."
          />

          <InputField
            label="피하고 싶은 요소 직접 추가"
            name="customReaderAvoidance"
            value={formData.customReaderAvoidance}
            onChange={handleChange}
            placeholder="예: 가격 정보 없이 감상만 많은 글"
            description="글에서 피해야 할 방향을 추가로 입력해주세요."
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
            placeholder="예: 헤어라인왁싱, 전후관리, 템퍼링 음식"
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
            placeholder="예: 예약 전 확인용, 유지기 식단 고민"
            description="선택지에 없는 상황을 추가로 입력해주세요."
          />

          <ChipGroup
            label="감정/공감 키워드"
            name="emotionKeyword"
            selectedValues={formData.emotionKeyword}
            onChange={handleChipChange}
            options={emotionOptions}
            description="감정선이나 공감 포인트를 만들어주는 키워드입니다."
          />

          <InputField
            label="감정 표현 직접 추가"
            name="customEmotionKeyword"
            value={formData.customEmotionKeyword}
            onChange={handleChange}
            placeholder="예: 기대 안 했는데 상담이 생각보다 편했다"
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
            placeholder="예: 처음 왁싱샵을 예약하기 전 분위기를 알고 싶은 사람"
            description="더 구체적인 독자가 있다면 입력해주세요."
          />
        </SectionCard>
      );
    }

    if (currentStep === 2) {
      return (
        <SectionCard
          title="3단계. 직접 경험·절차·수치"
          description="감상보다 결론·수치·절차를 구체화합니다. AI 브리핑형 글의 핵심 재료입니다."
        >
          <SelectField
            label="방문/사용 시간대"
            name="visitTime"
            value={formData.visitTime}
            onChange={handleChange}
            options={visitTimeOptions}
            description="언제 방문하거나 사용했는지 선택해주세요."
          />

          <InputField
            label="경험 날짜 / 시기"
            name="experienceDate"
            value={formData.experienceDate}
            onChange={handleChange}
            placeholder="예: 2026년 6월 평일 오후 / 3개월 사용"
            description="방문일, 사용 기간, 체험 시기를 입력해주세요."
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
            label="방문/구매/사용 전 상태"
            name="beforeState"
            value={formData.beforeState}
            onChange={handleChange}
            placeholder="예: 처음이라 통증이 걱정됐고, 가격이 어느 정도인지 궁금했다."
            description="경험 전 상황이나 고민을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="방문/구매 이유"
            name="visitReason"
            value={formData.visitReason}
            onChange={handleChange}
            placeholder="예: 예약 전 실제 소요 시간과 분위기가 궁금해서 방문했다."
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
            label="단계별 진행 순서"
            name="processSteps"
            value={formData.processSteps}
            onChange={handleChange}
            placeholder="예: 예약 → 도착 → 상담 → 시술 → 마무리 안내 → 결제"
            description="실제 진행 과정을 순서대로 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="단계별 소요 시간"
            name="stepDuration"
            value={formData.stepDuration}
            onChange={handleChange}
            placeholder="예: 상담 10분, 시술 30분, 마무리 안내 5분"
            description="소요 시간을 알면 최대한 구체적으로 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="직접 경험 수치 3개"
            name="experienceNumbers"
            value={formData.experienceNumbers}
            onChange={handleChange}
            placeholder="예: 평일 오후 방문 / 대기 없음 / 전체 45분 / 역에서 도보 5분 / 가격은 상담 후 안내"
            required
            error={errors.experienceNumbers}
            description="AI 브리핑형 글의 핵심 재료입니다. 시간, 가격, 거리, 기간, 횟수 등 3개 이상 입력해주세요."
            rows={4}
          />

          <TextAreaField
            label="예상과 달랐던 점"
            name="unexpectedPoint"
            value={formData.unexpectedPoint}
            onChange={handleChange}
            placeholder="예: 생각보다 상담이 길고 자세했다."
            description="검색 전 예상과 실제 경험의 차이를 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="시행착오"
            name="trialAndError"
            value={formData.trialAndError}
            onChange={handleChange}
            placeholder="예: 주차 정보를 미리 확인하지 않아서 도착 전에 조금 헤맸다."
            description="독자가 미리 알면 좋을 실수나 주의점을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="결과 / 변화"
            name="resultChange"
            value={formData.resultChange}
            onChange={handleChange}
            placeholder="예: 사진 찍었을 때 헤어라인이 전보다 깔끔하게 보여서 만족스러웠다."
            description="방문/사용 후 느낀 변화나 결과를 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="기억에 남는 순간"
            name="memorableMoment"
            value={formData.memorableMoment}
            onChange={handleChange}
            placeholder="예: 직원 설명이 자세해서 예약 전 궁금했던 부분이 풀렸다."
            description="가장 인상 깊었던 순간을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="실제 경험 상세"
            name="realExperienceDetail"
            value={formData.realExperienceDetail}
            onChange={handleChange}
            placeholder="예: 평일 오후에 방문했고, 상담 후 실제 진행 순서를 확인했다. 전체적으로 대기 없이 진행됐고 안내가 자세했다."
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
          title="4단계. 장단점·비교·선택 기준"
          description="좋았던 점과 아쉬운 점을 넘어서, 다른 선택지와 비교했을 때의 판단 기준까지 입력합니다."
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
            placeholder="예: 상담할 때 초보자 기준으로 설명해줘서 부담이 덜했다."
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
            placeholder="예: 가격보다 상담 방식이 구체적이었던 점"
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
            placeholder="예: 주차 정보는 방문 전에 따로 확인하는 게 좋을 것 같다."
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

          <TextAreaField
            label="비교 대상"
            name="comparisonTarget"
            value={formData.comparisonTarget}
            onChange={handleChange}
            placeholder="예: 주변 일반 왁싱샵 / 올드타운 중심 숙소 / 일반 헬스장"
            description="비교할 다른 선택지나 대안을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="비교 기준"
            name="comparisonCriteria"
            value={formData.comparisonCriteria}
            onChange={handleChange}
            placeholder="예: 가격, 위치, 소요 시간, 분위기, 상담 방식"
            description="어떤 기준으로 비교할지 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="이곳/이 제품/이 방법이 더 나은 점"
            name="betterPoint"
            value={formData.betterPoint}
            onChange={handleChange}
            placeholder="예: 헤어라인과 구렛나루를 얼굴형 기준으로 봐준 점"
            description="다른 선택지보다 좋았던 기준을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="다른 선택지가 나을 수 있는 경우"
            name="alternativeBetterCase"
            value={formData.alternativeBetterCase}
            onChange={handleChange}
            placeholder="예: 가격만 최우선이면 이벤트가 있는 곳도 비교해보는 게 좋다."
            description="무조건 추천이 아니라 선택 기준을 균형 있게 만들기 위한 항목입니다."
            rows={3}
          />

          <TextAreaField
            label="최종 선택 기준"
            name="selectionStandard"
            value={formData.selectionStandard}
            onChange={handleChange}
            placeholder="예: 자연스러운 라인 정리와 상담 친절함을 중요하게 보면 적합하다."
            description="어떤 사람에게 맞는 선택인지 판단 기준을 입력해주세요."
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
          title="5단계. 정보 박스·사진 근거·릴스"
          description="주소, 가격, 주차뿐 아니라 사진이 어떤 정보를 증명하는지도 입력합니다."
        >
          <InputField
            label="주소/위치"
            name="placeAddress"
            value={formData.placeAddress}
            onChange={handleChange}
            placeholder="예: 서울 용산구 ○○로 1층"
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
            placeholder="예: 가격은 상담 후 안내 / 1회 80,000원 / 이벤트 확인 필요"
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
            placeholder="예: 첫 방문 할인 / 오픈 이벤트 진행 중"
            description="이벤트나 할인 정보가 있다면 입력해주세요."
          />

          <TextAreaField
            label="장소/제품 추가 정보"
            name="placeInfoDetail"
            value={formData.placeInfoDetail}
            onChange={handleChange}
            placeholder="예: 역에서 도보 5분이라 접근성이 좋고, 큰길가라 찾기 쉬웠다."
            description="주소, 위치, 특징 외에 더 넣고 싶은 정보를 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="정보 박스에 넣을 내용"
            name="infoBoxItems"
            value={formData.infoBoxItems}
            onChange={handleChange}
            placeholder="예: 위치, 예약, 주차, 시술 시간, 가격 확인 필요, 재방문 의사"
            description="본문 상단이나 중간에 들어갈 요약 정보 박스 재료입니다."
            rows={4}
          />

          <TextAreaField
            label="방문/구매/사용 전 확인할 정보"
            name="checkBeforeVisit"
            value={formData.checkBeforeVisit}
            onChange={handleChange}
            placeholder="예: 주차 가능 여부, 예약 시간, 가격 안내 방식"
            description="독자가 저장하고 싶어할 체크 포인트를 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="관련 글 링크 주제"
            name="relatedPostTopic"
            value={formData.relatedPostTopic}
            onChange={handleChange}
            placeholder="예: 용산왁싱 후기, 헤어라인 왁싱 전후 관리, 이태원왁싱 비교"
            description="본문 하단에 연결하면 좋을 내부 링크 주제를 입력해주세요."
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
            placeholder="예: 상담받는 뒷모습, 시술 공간 입구, 결과 비교 컷"
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
            placeholder="예: 내부 공간 사진에서는 위생과 1인 관리 공간 느낌을 강조하고 싶다."
            description="사진마다 설명하고 싶은 내용을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="사진이 증명하는 정보"
            name="photoProofPoint"
            value={formData.photoProofPoint}
            onChange={handleChange}
            placeholder="예: 입구 사진은 위치 설명, 내부 사진은 위생 설명, 결과 사진은 전후 차이 설명"
            description="사진을 단순 분위기 컷이 아니라 본문 근거로 쓰기 위한 항목입니다."
            rows={4}
          />

          <TextAreaField
            label="사진별 캡션 목적"
            name="photoCaptionPurpose"
            value={formData.photoCaptionPurpose}
            onChange={handleChange}
            placeholder="예: 사진마다 위치/과정/결과/주의점을 설명하는 캡션으로 작성"
            description="사진 아래 문구가 어떤 역할을 해야 하는지 입력해주세요."
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
        title="6단계. AI 브리핑형 출력 설정"
        description="글의 말투, 분량, 첫 3줄 구조, 정보 박스와 비교표 포함 여부를 정합니다."
      >
        <SelectField
          label="원하는 톤"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          options={toneOptions}
          required
          error={errors.tone}
          description="20~30대 여성 블로거 느낌, 정보 정리형 말투 등 글의 전체 말투를 선택해주세요."
        />

        <SelectField
          label="원하는 글자 수"
          name="wordCount"
          value={formData.wordCount}
          onChange={handleChange}
          options={wordCountOptions}
          required
          error={errors.wordCount}
          description="네이버 블로그 글은 1800자 전후가 무난합니다."
        />

        <SelectField
          label="첫 3줄 스타일"
          name="introStyle"
          value={formData.introStyle}
          onChange={handleChange}
          options={introStyleOptions}
          description="첫 문단을 결론형, 숫자형, 비교형 등 어떤 방식으로 시작할지 선택해주세요."
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
          placeholder="예: 예약 전 가격과 소요 시간이 제일 궁금했다."
          description="첫 문단에서 독자를 끌어당길 이야기를 입력해주세요."
          rows={3}
        />

        <TextAreaField
          label="반전/특이점"
          name="uniquePoint"
          value={formData.uniquePoint}
          onChange={handleChange}
          placeholder="예: 생각보다 상담이 자세했고, 결과보다 과정 안내가 더 기억에 남았다."
          description="읽는 사람이 '오?' 하고 느낄 만한 특징을 입력해주세요."
          rows={3}
        />

        <SelectField
          label="정보 박스 포함"
          name="includeInfoBox"
          value={formData.includeInfoBox}
          onChange={handleChange}
          options={yesNoOptions}
          description="본문에 핵심 정보 박스를 포함할지 선택해주세요."
        />

        <SelectField
          label="비교표 포함"
          name="includeComparisonTable"
          value={formData.includeComparisonTable}
          onChange={handleChange}
          options={yesNoOptions}
          description="본문 중간에 비교표를 포함할지 선택해주세요."
        />

        <SelectField
          label="하단 요약 박스 포함"
          name="includeSummaryBox"
          value={formData.includeSummaryBox}
          onChange={handleChange}
          options={yesNoOptions}
          description="글 하단에 좋았던 점, 아쉬운 점, 추천 대상을 정리할지 선택해주세요."
        />

        <SelectField
          label="관련 글 링크 문구 포함"
          name="includeRelatedPost"
          value={formData.includeRelatedPost}
          onChange={handleChange}
          options={yesNoOptions}
          description="본문 하단에 함께 읽으면 좋은 글 문구를 넣을지 선택해주세요."
        />

        <SelectField
          label="기존 글 업데이트 체크리스트 포함"
          name="includeUpdateChecklist"
          value={formData.includeUpdateChecklist}
          onChange={handleChange}
          options={yesNoOptions}
          description="이미 쓴 글을 개선할 때 필요한 체크리스트를 포함할지 선택해주세요."
        />

        <SelectField
          label="AI 말투 제거 강도"
          name="aiToneRemoveLevel"
          value={formData.aiToneRemoveLevel}
          onChange={handleChange}
          options={aiToneRemoveOptions}
          description="AI가 쓴 것 같은 표현을 얼마나 강하게 줄일지 선택해주세요."
        />

        <TextAreaField
          label="꼭 포함할 내용"
          name="mustInclude"
          value={formData.mustInclude}
          onChange={handleChange}
          placeholder="예: 체험단 고지, 주차 확인 필요, 예약 방식, 소요 시간"
          description="결과물에 꼭 들어가야 하는 내용을 입력해주세요."
          rows={3}
        />

        <TextAreaField
          label="피하고 싶은 표현"
          name="avoidPoint"
          value={formData.avoidPoint}
          onChange={handleChange}
          placeholder="예: 너무 광고 같은 표현, 과장된 추천 표현, 역대급, 무조건 추천"
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
          <p style={styles.badge}>Naver AI Briefing Prompt Maker</p>

          <h1 style={styles.title}>AI 브리핑형 블로그/릴스 프롬프트 만들기</h1>

          <p style={styles.subtitle}>
            결론, 수치, 비교 기준, 정보 박스, 사진 근거를 입력하면 네이버
            블로그와 릴스용 프롬프트가 자동으로 정리됩니다.
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
