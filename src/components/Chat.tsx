import { memo, VFC } from 'react'
import { Avatar, Box, ListItem, ListItemAvatar, styled } from '@mui/material'

import NoProfile from 'img/no-profile.png'
import Soratsm from 'img//monster.jpg'

type Props = {
  text: string
  isQuestion: boolean
}

const Chat: VFC<Props> = (props) => {
  const { text, isQuestion } = props

  return (
    <SListItem
      sx={
        isQuestion ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }
      }
    >
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="Icon" src={Soratsm} />
        ) : (
          <Avatar alt="Icon" src={NoProfile} />
        )}
      </ListItemAvatar>
      <SBox>{text}</SBox>
    </SListItem>
  )
}

export default memo(Chat)

const SListItem = styled(ListItem)({
  display: 'flex',
  paddingRight: '0 !important',
  justifyContent: 'flex-start',
})

const SBox = styled(Box)({
  background: '#41B6E6',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 500,
  padding: '.5rem',
  marginRight: '1rem',
  maxWidth: '80%',
  width: 'auto',
})
