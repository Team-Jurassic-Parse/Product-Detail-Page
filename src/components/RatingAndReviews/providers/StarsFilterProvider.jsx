import React, { createContext, useState, useCallback, useMemo } from 'react';

export const StarsFilterContext = createContext();

function StarsFilterProvider({ children }) { // eslint-disable-line
  const [starsFilter, setStarsFilter] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const toggleStarsFilter = useCallback((star) => {
    setStarsFilter((currentFilter) => ({
      ...currentFilter,
      [star]: !currentFilter[star],
    }));
  }, []);
  const value = useMemo(
    () => ({ starsFilter, toggleStarsFilter }),
    [starsFilter, toggleStarsFilter]
  );

  return (
    <StarsFilterContext.Provider value={value}>
      {children}
    </StarsFilterContext.Provider>
  );
}

export default StarsFilterProvider;
