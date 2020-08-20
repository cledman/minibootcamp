import React from 'react';

function Flag({ ...props }: any) {
  const { image } = props;
  console.log({image})
  return (
    <>
        <img src={`../flags/${image}.png`}/>

    </>
  );
}

export default Flag;
