import Nav from './Nav';
import Logo from '/logo.png';
import { S } from '../../style/StLayout/Header.style';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Link to="/">
        <S.Logo src={Logo} alt="Logo" />
      </S.Link>
      <Nav />
    </S.HeaderContainer>
  );
};

export default Header;
