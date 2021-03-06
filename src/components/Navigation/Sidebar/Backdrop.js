import React from  'react';

import styled from 'styled-components';
import * as colors from '../../../styles/variables'

const backdrop = ({show, clicked}) => (
    show ? 
    (
      <StyledBackdrop>
        <div onClick={clicked}></div>
      </StyledBackdrop>
    )
    :
    null
)

export default backdrop;

const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: ${colors.overlay};
` 

