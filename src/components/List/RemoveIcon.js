import React from 'react'
import styled from 'styled-components'

const Root = styled.svg`
  transform: rotateZ(45deg)
`

const RemoveIcon = () => {
  return (
    <Root xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
      <path d="M42 20H22V0h-2v20H0v2h20v20h2V22h20z"/>
    </Root>
  )
}

export default RemoveIcon