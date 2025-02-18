import S from './layoutStyle/Header.style';
import logo from '/logo.png';
import Nav from './Nav';
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
