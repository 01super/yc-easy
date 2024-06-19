import { createContext } from 'react';
import { YcSearchProps } from './YcForm';

const YcSearchContext = createContext<
  Pick<YcSearchProps, 'columnGap' | 'rowCount' | 'itemWidth'> & {
    underRowCountWidth: string;
  }
>({
  columnGap: 10,
  itemWidth: 200,
  rowCount: 4,
  underRowCountWidth: '',
});

export default YcSearchContext;
