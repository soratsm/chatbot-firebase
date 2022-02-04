import { memo, VFC } from 'react'
import { Button, styled } from '@mui/material'

type Props = {
  content: string
  onClick:()=>void
}

const Answer: VFC<Props> = (props) => {
  const { content, onClick } = props
  return (
    <SButton onClick={onClick} variant="outlined" fullWidth >
      {content}
    </SButton>
  )
}

export default memo(Answer)

const SButton = styled(Button)({
  marginBottom: '8px',
  borderColor: '#FFB549',
  color: '#FFB549',
  fontWeight: 600,
  '&:hover': {
    borderColor: '#FFB549',
    backgroundColor: '#FFB549',
    color: '#fff',
  },
})
