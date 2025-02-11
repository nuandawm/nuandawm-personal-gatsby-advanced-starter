import React, { useCallback } from 'react';
import styled from 'styled-components';

const HEIGHT_QUICK_FIX = 15;

const SVGWrapper = styled.svg`
  width: 20px;
  height: 100%;
  fill: var(--color-grey-300);

  circle {
    fill: var(--color-grey-300);
  }
  
  .last-gradient-stop-1 {
    stop-color: var(--color-grey-500);
  }

  .last-gradient-stop-2 {
    stop-color: var(--color-grey-600);
    stop-opacity: 0;
  }
`

type TimeProgressionSVGProps = {
  timelineThickness: number;
  timelineHeight: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimeProgressionSVG = ({timelineThickness, timelineHeight, isFirst, isLast}: TimeProgressionSVGProps) => {
  // This is not right, but I didn't know how to do this without a ResizeObserver
  const calculateTopYCorrection = useCallback(
    (y: number) => isFirst ? y : y - HEIGHT_QUICK_FIX,
    [isFirst]
  )
  const calculateTopHeightCorrection = useCallback(
    (height: number) => isFirst ? height : height + HEIGHT_QUICK_FIX,
    [isFirst]
  )
  const calculateBottomHeightCorrection = useCallback(
    (height: number) => isLast ? height : height + HEIGHT_QUICK_FIX,
    [isLast]
  )

  return <SVGWrapper viewBox={`0 0 20 ${timelineHeight || 10}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="last-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop className="last-gradient-stop-1" offset="0%"/>
        <stop className="last-gradient-stop-2" offset="100%"/>
      </linearGradient>
      <linearGradient id="first-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop className="last-gradient-stop-2" offset="0%"/>
        <stop className="last-gradient-stop-1" offset="100%"/>
      </linearGradient>
    </defs>
    {timelineHeight &&
      <>
        <rect width={timelineThickness} x={5} y={calculateTopYCorrection(0)}
              height={calculateTopHeightCorrection(50)}
              fill={isFirst ? 'url(#first-gradient)' : 'var(--color-grey-600)'}/>
        <rect width={timelineThickness} x={5} y={50}
              height={calculateBottomHeightCorrection(timelineHeight - 50)}
              fill={isLast ? 'url(#last-gradient)' : 'var(--color-grey-600)'}/>
      </>}
    <circle cx={10} cy={50} r={10}/>
  </SVGWrapper>
}

export default TimeProgressionSVG
