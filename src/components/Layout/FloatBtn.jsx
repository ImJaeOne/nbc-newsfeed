import { useState } from 'react';
import { FaBars, FaArrowUp, FaUser, FaPen } from 'react-icons/fa'; // FontAwesome 아이콘 사용
import { S } from '../../style/StLayout/FloatBtn.Style';
import { useNavigate } from 'react-router-dom';

const FloatBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <S.FloatBtnContainer>
      {/* 메인 버튼 */}
      <S.FloatMainBtn onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={24} />
      </S.FloatMainBtn>

      {/* 드롭다운 메뉴 */}
      <S.DropdownMenuWrapper isOpen={isOpen}>
        <S.IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp />
        </S.IconButton>
        <S.IconButton onClick={() => navigate('/mypage')}>
          <FaUser />
        </S.IconButton>
        <S.IconButton onClick={() => navigate('/post')}>
          <FaPen />
        </S.IconButton>
      </S.DropdownMenuWrapper>
    </S.FloatBtnContainer>
  );
};

export default FloatBtn;
