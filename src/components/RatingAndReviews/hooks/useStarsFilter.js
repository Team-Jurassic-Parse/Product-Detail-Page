import { useContext } from 'react';
import { StarsFilterContext } from '../providers/StarsFilterProvider.jsx';

const useStarsFilter = () => useContext(StarsFilterContext);

export default useStarsFilter;
