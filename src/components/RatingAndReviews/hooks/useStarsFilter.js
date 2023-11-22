import { useContext } from 'react';
import { StarsFilterContext } from '../providers/StarsFilterProvider.jsx'; // eslint-disable-line

const useStarsFilter = () => useContext(StarsFilterContext);

export default useStarsFilter;
