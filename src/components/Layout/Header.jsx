import Nav from './Nav';
import { S } from '../../style/StLayout/Header.style';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.Link to="/">
        <S.Logo
          src="https://private-user-images.githubusercontent.com/192562150/412856181-af9e8b8c-3202-4b86-b442-08a3274e9af8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk0NDQ5MDcsIm5iZiI6MTczOTQ0NDYwNywicGF0aCI6Ii8xOTI1NjIxNTAvNDEyODU2MTgxLWFmOWU4YjhjLTMyMDItNGI4Ni1iNDQyLTA4YTMyNzRlOWFmOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDIxM1QxMTAzMjdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00Y2ZhMjBhZmEwYzRmYzVlYjg3ZGFmNzA2NTI3YmNmNDljNGYzMmUwODU4NTliYmVkZjIyOTc3ZmYwZDI2YmY4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.Dgn51EJ7UP7YmEKZqIvx5Oq-HDZYrjg8zEMv4ASNTP4"
          alt="Logo"
        />
      </S.Link>
      <Nav />{' '}
    </S.HeaderContainer>
  );
};

export default Header;
