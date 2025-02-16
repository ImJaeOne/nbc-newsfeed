import styled from 'styled-components';
import basic_image from '../../assets/basic-profile.png';

const BASIC_IMAGE = basic_image;

const UserProfile = ({ src, alt, size, margin = '0' }) => {
  return !src ? (
    <StUserProfile
      src={BASIC_IMAGE}
      alt="기본 이미지"
      size={size}
      $margin={margin}
    />
  ) : (
    <StUserProfile src={src} alt={alt} size={size} $margin={margin} />
  );
};

const StUserProfile = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  margin: ${({ $margin }) => $margin};
  border-radius: 50%;
  object-fit: cover;
`;

export default UserProfile;
