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

export function buildPromptData(formData) {
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
      formData.coreConclusion
        ? `사용자가 입력한 핵심 결론: ${formData.coreConclusion}`
        : "핵심 결론: 사용자가 직접 입력하지 않았으므로 주제, 검색 의도, 직접 경험, 장단점, 수치 정보를 바탕으로 가장 적합한 결론을 자동 생성",
      formData.experienceNumbers && `직접 경험 수치: ${formData.experienceNumbers}`,
      formData.recommendTarget
        ? `사용자가 입력한 추천 대상: ${formData.recommendTarget}`
        : "추천 대상: 사용자가 직접 입력하지 않았으므로 대표 키워드, 검색 의도, 독자 궁금증, 실제 경험을 바탕으로 가장 적합한 독자군을 자동 생성",
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
      formData.coreConclusion
        ? `한 줄 결론: ${formData.coreConclusion}`
        : "한 줄 결론: 입력값 전체를 바탕으로 자동 생성",
      formData.goodPointDetail && `좋았던 점 요약: ${formData.goodPointDetail}`,
      formData.badPointDetail && `아쉬웠던 점 요약: ${formData.badPointDetail}`,
      formData.recommendTarget
        ? `추천 대상: ${formData.recommendTarget}`
        : "추천 대상: 검색 의도와 독자 궁금증을 바탕으로 자동 생성",
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

    const verificationData = combineText([
      formData.infoCheckedDate && `정보 확인 기준일: ${formData.infoCheckedDate}`,
      formData.officialSource && `공식 정보 출처: ${formData.officialSource}`,
      formData.priceUpdatedDate && `가격 확인 기준: ${formData.priceUpdatedDate}`,
      formData.factCheckedInfo && `공식 정보로 확인한 내용: ${formData.factCheckedInfo}`,
      formData.experienceOnlyInfo && `직접 경험한 내용: ${formData.experienceOnlyInfo}`,
      formData.needCheckInfo && `확인 필요 정보: ${formData.needCheckInfo}`,
      formData.personalFeeling && `개인적인 느낌: ${formData.personalFeeling}`,
    ]);

    const writingStyleGuide = combineText([
      "20~30대 여성 블로거가 직접 경험하고 쓰는 듯한 자연스러운 말투로 작성해주세요.",
      "첫 3줄 안에 핵심 결론, 직접 경험 수치, 추천 대상을 넣어주세요. 단, 핵심 결론이나 추천 대상이 비어 있으면 입력값 전체를 바탕으로 가장 적합한 내용을 직접 도출해주세요.",
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
      verificationData,
      includeInfoBox: formData.includeInfoBox,
      includeComparisonTable: formData.includeComparisonTable,
      includeSummaryBox: formData.includeSummaryBox,
      includeRelatedPost: formData.includeRelatedPost,
      includeUpdateChecklist: formData.includeUpdateChecklist,
      aiToneRemoveLevel: formData.aiToneRemoveLevel,
      relatedPostTopic: formData.relatedPostTopic,
      wordCount: formData.wordCount,
      reelsStyle: formData.reelsStyle,
      reelsGoal: formData.reelsGoal,
    };
}
