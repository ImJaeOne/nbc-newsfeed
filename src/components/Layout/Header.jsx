import Nav from './Nav';
import logo from '/logo.png';
import { S } from '../../style/StLayout/Header.style';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Link to="/">
        <S.Logo src={logo} alt="Logo" />
      </S.Link>
      <Nav />
    </S.HeaderContainer>
  );
};

export default Header;
