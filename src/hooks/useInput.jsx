import { useState } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleValue = (e) => setValue(e.target.value);
  return { value, onChange: handleValue };
};

export default useInput;
