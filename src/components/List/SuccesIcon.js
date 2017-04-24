import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Svg = styled.svg`
  ${props => props.success && 'fill: #22c522'}
`

const SuccessIcon = ({ success }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" success={success}>
      <path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"/>
      { success
        &&
        <path d="M38.252 15.336l-15.369 17.29-9.259-7.407a1 1 0 0 0-1.249 1.562l10 8a.999.999 0 0 0 1.373-.117l16-18a1 1 0 1 0-1.496-1.328z"/>
      }
    </Svg>
  )
}

SuccessIcon.propTypes = {
  success: PropTypes.bool,
}

export default SuccessIcon