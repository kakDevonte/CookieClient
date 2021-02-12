import React from 'react';

function ShadowLayer({state}){
  return (
    <article className={'shadow-layer' + state} />
  );
}

export default ShadowLayer;