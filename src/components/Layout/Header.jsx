import Nav from './Nav';
import logo from '/logo.png';
import { S } from '../../style/StLayout/Header.style';

const LOGO_IMAGE = logo;

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Link to="/">
        <S.Logo src={LOGO_IMAGE} alt="Logo" />
      </S.Link>
      <Nav />
    </S.HeaderContainer>
  );
};

export default Header;
