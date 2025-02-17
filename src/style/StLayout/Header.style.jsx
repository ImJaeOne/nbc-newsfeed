import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const S = {};

S.NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px; /* ✅ 버튼과 링크 간격 */
`;

S.HeaderContainer = styled.header`
  position: fixed; /* ✅ 화면 상단 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.nav_background_color};
  border-bottom: 2px solid #f9a751;
  z-index: 1000; /* ✅ 다른 요소 위에 배치 */
  box-sizing: border-box;
`;

S.Logo = styled.img`
  height: 100px; /* ✅ 로고 크기 조정 */
`;
S.Link = styled(Link)`
  display: flex;
  gap: 15px;
`;

S.LinksWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

S.UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

S.Logoutbtn = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.haeder_text_color};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  border: none;
  transition: 0.3s;

  &:hover {
    scale: 1.2;
  }
`;

S.UserName = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.haeder_text_color};
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    scale: 1.2;
  }
`;

S.AuthLink = styled(Link)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.haeder_text_color};
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    scale: 1.2;
  }
`;
