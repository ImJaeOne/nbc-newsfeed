import { PiBowlFoodFill, PiBowlFoodLight, PiGuitarFill } from 'react-icons/pi';
import { MdSportsEsports, MdSportsTennis } from 'react-icons/md';

export const postCategory = [
  {
    categoryName: '일상',
    categoryIcon: <PiBowlFoodFill />,
    categoryCheckedIcon: (
      <PiBowlFoodFill
        style={{ backgroundColor: '#E5BA73', borderRadius: '8px' }}
      />
    ),
    checked: false,
  },
  {
    categoryName: '운동',
    categoryIcon: <MdSportsTennis />,
    categoryCheckedIcon: (
      <MdSportsTennis
        style={{ backgroundColor: '#E5BA73', borderRadius: '8px' }}
      />
    ),
    checked: false,
  },
  {
    categoryName: '취미',
    categoryIcon: <MdSportsEsports />,
    categoryCheckedIcon: (
      <MdSportsEsports
        style={{ backgroundColor: '#E5BA73', borderRadius: '8px' }}
      />
    ),
    checked: false,
  },
  {
    categoryName: '맛집',
    categoryIcon: <PiBowlFoodFill />,
    categoryCheckedIcon: (
      <PiBowlFoodFill
        style={{ backgroundColor: '#E5BA73', borderRadius: '8px' }}
      />
    ),
    checked: false,
  },
  {
    categoryName: '기타',
    categoryIcon: <PiGuitarFill />,
    categoryCheckedIcon: (
      <PiGuitarFill
        style={{ backgroundColor: '#E5BA73', borderRadius: '8px' }}
      />
    ),
    checked: false,
  },
];
