"use client";
import DetailProjectCard from "./components/DetailProjectCard";

export default function page() {
  const handleParticipate = () => {
    // TODO : 백엔드 로직으로 대체 예정
    console.log("참여하기 버튼 클릭");
  };

  return (
    <DetailProjectCard
      projectName="프로젝트명"
      description="한줄소개?"
      onParticipate={handleParticipate}
    />
  );
}
