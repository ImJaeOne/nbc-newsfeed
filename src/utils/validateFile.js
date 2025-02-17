// 이미지 파일 유효성 검사
export const validateFile = (file) => {
  if (!file) {
    return { fileResult: 'undefinedFile' };
  }

  if (!file.type?.startsWith('image/')) {
    return { fileResult: 'notImageFile' };
  }

  return { fileResult: 'isImageFile' };
};
