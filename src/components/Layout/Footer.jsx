import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>내일배움캠프_9기</FooterTitle>
        <LinkContainer>
          <FooterLink href="https://github.com/ImJaeOne" target="_blank">
            👑임재원
          </FooterLink>
          <FooterLink href="https://github.com/woohyuckk" target="_blank">
            강우혁
          </FooterLink>
          <FooterLink href="https://github.com/K-jisu" target="_blank">
            강지수
          </FooterLink>
          <FooterLink href="https://velog.io/@pureunkang/posts" target="_blank">
            강푸른
          </FooterLink>
          <FooterLink href="https://velog.io/@bungbuung" target="_blank">
            이지은
          </FooterLink>
        </LinkContainer>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components
const FooterContainer = styled.footer`
  width: 100%;
  background: rgba(247, 187, 124, 0.7); /* 투명도 조절 */
  backdrop-filter: blur(10px); /* 블러 효과 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
const FooterTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;
const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #3d2c2e; /* 배경색과 어울리는 어두운 글씨 */
  font-size: 14px;
  font-weight: 600;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

const FooterLink = styled.a`
  color: #3d2c2e;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #9c5c2a; /* 호버 시 색상 변경 */
  }
`;
