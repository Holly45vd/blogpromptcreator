import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import SectionCard from "../components/SectionCard";
import SelectField from "../components/SelectField";
import ChipGroup from "../components/ChipGroup";
import "../components/formFields.css";
import {
  steps,
  inputModeOptions,
  categoryOptions,
  purposeOptions,
  contentTypeOptions,
  contentGoalOptions,
  disclosureOptions,
  searchIntentOptions,
  readerCuriosityOptions,
  readerAvoidanceOptions,
  relatedKeywordOptions,
  situationOptions,
  emotionOptions,
  targetReaderOptions,
  visitTimeOptions,
  companionOptions,
  beforeConcernOptions,
  firstImpressionOptions,
  strengthOptions,
  concernOptions,
  satisfactionOptions,
  revisitOptions,
  priceRangeOptions,
  parkingOptions,
  reservationOptions,
  photoShotOptions,
  hookStyleOptions,
  introStyleOptions,
  yesNoOptions,
  aiToneRemoveOptions,
  toneOptions,
  wordCountOptions,
  reelsStyleOptions,
  reelsGoalOptions,
} from "../data/formOptions";
import { initialFormData } from "../data/initialFormData";
import { requiredFieldsByStep } from "../data/requiredFields";
import { buildPromptData } from "../utils/buildPromptData";

function FormPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedDraft = localStorage.getItem("blogPromptDraft");

    if (!savedDraft) return;

    try {
      const parsedDraft = JSON.parse(savedDraft);
      setFormData((prev) => ({ ...prev, ...parsedDraft }));
    } catch (error) {
      localStorage.removeItem("blogPromptDraft");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blogPromptDraft", JSON.stringify(formData));
  }, [formData]);


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

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateStep(currentStep);
    if (!isValid) return;

    const dataToSave = buildPromptData(formData);

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
          <SelectField
            label="입력 모드"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            options={inputModeOptions}
            description="빠른 생성 모드는 필수 정보 위주, 정밀 생성 모드는 모든 세부 항목을 활용합니다."
          />

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
            placeholder="비워두면 입력 정보를 바탕으로 자동 생성됩니다. 예: 초보자도 상담받기 편했지만, 주차는 방문 전 확인하는 게 좋았다."
            error={errors.coreConclusion}
            description="선택 입력입니다. 직접 쓰지 않으면 주제, 경험, 장단점, 수치 정보를 바탕으로 가장 적합한 첫 3줄 결론을 생성하도록 프롬프트에 지시합니다."
            rows={3}
          />

          <TextAreaField
            label="추천 대상"
            name="recommendTarget"
            value={formData.recommendTarget}
            onChange={handleChange}
            placeholder="비워두면 검색 의도와 경험 정보를 바탕으로 자동 생성됩니다. 예: 처음 방문 전 가격, 분위기, 소요 시간을 알고 싶은 사람"
            error={errors.recommendTarget}
            description="선택 입력입니다. 직접 쓰지 않으면 대표 키워드, 검색 의도, 독자 궁금증을 바탕으로 가장 적합한 추천 대상을 생성하도록 프롬프트에 지시합니다."
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

          <InputField
            label="정보 확인 기준일"
            name="infoCheckedDate"
            value={formData.infoCheckedDate}
            onChange={handleChange}
            placeholder="예: 2026년 6월 기준"
            description="가격, 운영시간, 예약 정보를 확인한 기준일입니다."
          />

          <InputField
            label="공식 정보 출처"
            name="officialSource"
            value={formData.officialSource}
            onChange={handleChange}
            placeholder="예: 네이버 플레이스, 공식 홈페이지, 인스타그램, 전화 문의"
            description="공식적으로 확인한 정보 출처를 입력해주세요."
          />

          <InputField
            label="가격 확인 기준"
            name="priceUpdatedDate"
            value={formData.priceUpdatedDate}
            onChange={handleChange}
            placeholder="예: 2026년 6월 방문 기준 / 이벤트가에 따라 변동"
            description="가격 정보가 바뀔 수 있다면 기준 시점을 적어주세요."
          />

          <TextAreaField
            label="공식 정보로 확인한 내용"
            name="factCheckedInfo"
            value={formData.factCheckedInfo}
            onChange={handleChange}
            placeholder="예: 영업시간, 예약 방법, 위치, 주차 여부는 네이버 플레이스에서 확인"
            description="본문에서 객관 정보로 다룰 내용을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="직접 경험한 내용"
            name="experienceOnlyInfo"
            value={formData.experienceOnlyInfo}
            onChange={handleChange}
            placeholder="예: 평일 저녁 방문 기준 대기 없이 바로 안내받았다."
            description="실제 경험으로만 말할 수 있는 내용을 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="확인 필요 정보"
            name="needCheckInfo"
            value={formData.needCheckInfo}
            onChange={handleChange}
            placeholder="예: 가격은 이벤트 여부에 따라 달라질 수 있어 방문 전 문의 필요"
            description="단정하지 말고 확인 필요로 처리할 정보를 입력해주세요."
            rows={3}
          />

          <TextAreaField
            label="개인적인 느낌"
            name="personalFeeling"
            value={formData.personalFeeling}
            onChange={handleChange}
            placeholder="예: 개인적으로는 상담이 자세해서 처음 가는 부담이 줄었다."
            description="팩트와 구분해서 개인 감상으로 표현할 내용을 입력해주세요."
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
