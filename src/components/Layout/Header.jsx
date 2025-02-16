import Nav from './Nav';
import { S } from '../../style/StLayout/Header.style';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Link to="/">
        <S.Logo src="/logo.png" alt="Logo" />
      </S.Link>
      <Nav />
    </S.HeaderContainer>
  );
};

export default Header;
