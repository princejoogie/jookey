import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BgDropProps {
  width: number;
}

const BgDrop: React.FC<BgDropProps> = ({ width }) => {
  const aspect = 1.082725060827251;

  return (
    <>
      <Svg
        width={width}
        height={width * aspect}
        viewBox="0 0 411 445"
        fill="none">
        <Path
          d="M283 349C236 279.5 236 234 170.5 123C105 12.0001 0 0.499969 0 0.499969V445H411V388.5C411 388.5 330 418.5 283 349Z"
          fill="#6366F1"
        />
      </Svg>
    </>
  );
};

export default BgDrop;
