import { memo, useLayoutEffect, useRef, VFC } from 'react'
import { List, styled } from '@mui/material'

import { Chat } from '.'
import { TypeChats } from 'types';

type Props = {
  chats: TypeChats[]
}

const Chats: VFC<Props> = (props) => {
  const { chats } = props

  // 自動スクロール
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    scrollBottomRef.current?.scrollIntoView()
  }, [chats])
  
  return (
    <SList>
      {chats.map((chat, index) => (
        <Chat key={index} text={chat.text} isQuestion={chat.isQuestion} />
      ))}
      <div ref={scrollBottomRef} />
    </SList>
  )
}

export default memo(Chats)

const SList = styled(List)({
  width: '100%',
  bgcolor: 'background.paper',
  height: 400,
  padding: '0',
  overflow: 'auto',

})
