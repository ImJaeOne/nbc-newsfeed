import styled from 'styled-components';

const S = {};

// Form 컨테이너: 카드 형태의 깔끔한 디자인
S.FormContainer = styled.form`
  width: 100%;
  max-width: 600px;
  background: linear-gradient(145deg, #ffffff, #f7f7f7);
  border-radius: 20px;
  padding: 40px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    width: auto;
    padding: 20px;
  }
`;

// 섹션 컨테이너
S.CommonSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: ${({ $section }) =>
    $section === 'fileSection' ? 'center' : 'flex-start'};

  @media (max-width: 1024px) {
    align-items: center;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// 카테고리 영역 (칩 스타일 느낌)
S.CategoryWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 15px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

S.CategoryLabel = styled.label`
  /* border: 1px solid black; */
  border-radius: 8px;
  cursor: pointer;
`;

S.CategoryInput = styled.input`
  position: absolute;
  opacity: 0;
`;

S.PostPart = styled.div`
  display: flex;
  flex-direction: ${({ $type }) => ($type === 'category' ? 'column' : 'row')};
  gap: 15px;
  width: 100%;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

// 📌 부드러운 오목한(눌린) 효과가 적용된 입력 필드
S.PostInput = styled.input`
  width: 100%;
  padding: 15px;
  background: #f1f1f1;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  box-shadow:
    inset 2px 2px 5px #bebebe,
    inset -2px -2px 5px #ffffff;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow:
      inset 3px 3px 6px #bebebe,
      inset -3px -3px 6px #ffffff;
  }

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// 📌 부드러운 오목한(눌린) 효과가 적용된 텍스트 에어리어
S.PostTextArea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 15px;
  background: #f1f1f1;
  border: none;
  outline: none;
  resize: none;
  border-radius: 10px;
  font-size: 16px;
  box-shadow:
    inset 2px 2px 5px #bebebe,
    inset -2px -2px 5px #ffffff;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow:
      inset 3px 3px 6px #bebebe,
      inset -3px -3px 6px #ffffff;
  }

  @media (max-width: 480px) {
    height: 140px;
    font-size: 14px;
  }
`;

// 파일 업로드 영역: 대시 테두리와 호버 효과로 고급스러운 느낌
S.FileLabel = styled.label`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  border: 2px dashed #f3c301;
  border-radius: 16px;
  font-size: 16px;
  color: #aaa;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: #fff8e1;
    transform: scale(1.02);
  }

  @media (max-width: 480px) {
    height: 180px;
    font-size: 14px;
  }
`;

// Post Label: 입력 필드와 관련 라벨들을 모아놓는 컨테이너
S.PostLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  letter-spacing: 0.5px;

  @media (max-width: 1024px) {
    align-items: center;
  }

  @media (max-width: 480px) {
    align-items: center;
    font-size: 14px;
  }
`;

// 제출 버튼: 그라데이션 효과와 부드러운 변환 효과
S.PostSubmitButton = styled.button`
  background: linear-gradient(135deg, #f3c301, #f7d150);
  border: none;
  border-radius: 12px;
  padding: 15px 20px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s;

  &:hover {
    background: linear-gradient(135deg, #f7d150, #f3c301);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 12px 16px;
  }
`;

export default S;
