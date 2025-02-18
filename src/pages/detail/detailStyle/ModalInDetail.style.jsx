import styled from 'styled-components';

const S = {};

S.ModalContainer = styled.div`
  display: flex;
`;

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

S.ModalContent = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

S.ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

S.ModalBody = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input,
  textarea {
    width: 95%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
  }

  textarea {
    height: 100px;
    resize: none;
  }
`;

S.ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 6px 12px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:first-child {
    background-color: #f2c450;
    color: white;
    transition: background 0.3s;

    &:hover {
      background-color: #f2c950;
    }
  }

  button:last-child {
    background-color: ${({ theme }) => theme.colors.haeder_text_color};
    color: white;
    transition: background 0.3s;

    &:hover {
      background-color: #f25151;
    }
  }
`;

S.CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export default S;
