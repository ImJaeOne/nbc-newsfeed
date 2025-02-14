import Nav from './Nav';
import { S } from '../../style/StLayout/Header.style';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.LinksWrapper to="/">
        <S.Logo src="/src/assets/logo.png " alt="Logo" />
      </S.LinksWrapper>
      <Nav />
    </S.HeaderContainer>
  );
};

export default Header;
