import { PropsWithChildren, useEffect, useState } from 'react';
import { styled } from 'styled-components';

export const stateToColor = {
  notAvailable: {
    start: '#4368EA',
    end: '#C52F1B',
  },
  loading: {
    start: '#4368ea',
    end: '#c490dd',
  },
  available: {
    start: '#4368EA',
    end: '#1DAF83',
  },
};

export function SearchInputRing({
  children,
  isSearching,
  isENSNameAvailable,
}: PropsWithChildren<{ isSearching: boolean; isENSNameAvailable?: boolean }>) {
  const [gradiant, setGradiant] = useState({
    ...stateToColor.loading,
    degree: 0,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // If name is available, set the gradiant to green
    if (isENSNameAvailable === true) {
      setGradiant((prev) => ({
        ...prev,
        ...stateToColor.available,
        degree: 113,
      }));
      return;
    } else if (isENSNameAvailable === false) {
      // If name is not available, set the gradiant to red
      setGradiant((prev) => ({
        ...prev,
        ...stateToColor.notAvailable,
        degree: 111.35,
      }));
      return;
    }

    console.log({
      isSearching,
    });

    // If the search is in progress, create an interval to rotate the gradiant
    if (isSearching === true) {
      console.log({
        isSearching,
        gradiant,
      });

      interval = setInterval(() => {
        setGradiant((prev) => {
          if (prev.degree === 360) {
            return { ...prev, degree: 0 };
          }

          return {
            ...prev,
            ...stateToColor.loading,
            degree: prev.degree + 1,
          };
        });
      }, 10);
    } else {
      if (gradiant.degree === 0) {
        return;
      }
      // Create an interval to complete the rotation until 360/0 degrees
      interval = setInterval(() => {
        setGradiant((prev) => {
          // Stop the interval once the rotation is complete and reset the degree to 0
          if (prev.degree === 360) {
            clearInterval(interval);
            return { ...prev, degree: 0 };
          }
          return { ...prev, degree: prev.degree + 1 };
        });
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isENSNameAvailable, isSearching]);

  return (
    <StyledSearchInputRing
      style={{
        background: `linear-gradient(${gradiant.degree}deg, ${gradiant.start} -25.85%, ${gradiant.end} 73.38%)`,
      }}
    >
      {children}
    </StyledSearchInputRing>
  );
}

const StyledSearchInputRing = styled.div`
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  padding: 3px;

  border-radius: 18px;
`;
