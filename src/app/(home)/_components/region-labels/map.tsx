'use client';

import { VectorMap } from 'react-jvectormap';
import '@react-jvectormap/india';

export default function Map() {
  return (
    <div style={{ height: 422 }}>
      <VectorMap
        map="in_mill"
        backgroundColor="transparent"
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
        regionStyle={{
          initial: {
            fill: '#C8D0D8',
          },
          hover: {
            fillOpacity: 1,
            fill: '#3056D3',
          },
        }}
        containerClassName="map"
      />
    </div>
  );
}
