import { memo, VFC } from 'react'
import { Box, styled } from '@mui/material'

import { Answer } from '.'
import { TypeAnswer } from 'types'

type Props = {
  answers: TypeAnswer[]
  onClickAnswer: (answer: TypeAnswer) => void
}

const AnswersList: VFC<Props> = (props) => {
  const { answers, onClickAnswer } = props
  return (
    <SBox>
      {answers.map((answer, index) => (
        <Answer
          key={index.toString()}
          content={answer.content}
          onClick={() => onClickAnswer(answer)}
        />
      ))}
    </SBox>
  )
}

export default memo(AnswersList)

const SBox = styled(Box)({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'flex-end',
  height: '192px',
})
