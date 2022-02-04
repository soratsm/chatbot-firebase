import { useEffect, useRef, useState } from 'react'
import { Box, styled } from '@mui/material'

import defaultDataset from 'dataset'
import { AnswersList, Chats } from 'components'
import { FormDialog } from 'components/forms'
import { TypeAnswer, TypeChats, TypeId } from 'types'

const App = () => {
  const [answers, setAnswers] = useState<TypeAnswer[]>([])
  const [answer, setAnswer] = useState('')
  const [chats, setChats] = useState<TypeChats[]>([])
  const [currentId, setCurrentId] = useState('init')
  const [dataset, setDataset] = useState(defaultDataset)
  const [open, setOpen] = useState(false)

  const onClickAnswer = (answer: TypeAnswer) => {
    if (answer.nextId === 'contact') {
      setOpen(true)
    } else if (/^https:*/.test(answer.nextId)) {
      // リンクなら別タブで開く
      const a = document.createElement('a')
      a.href = answer.nextId
      a.target = '_blank'
      a.click()
    } else {
      setAnswer(answer.content)
      setCurrentId(answer.nextId)
    }
  }
  useEffect(() => {
    console.log(currentId)

    // ユーザーチャット
    const answerChats =
      answer === '' || currentId === 'init'
        ? [...chats]
        : [...chats, { text: answer, isQuestion: false }]
    setChats(answerChats)

    // ボットチャット
    setTimeout(() => {
      // nextIdに応じた返答をする
      const questionChats = [
        ...answerChats,
        { text: dataset[currentId as TypeId].question, isQuestion: true },
      ]
      setChats(questionChats)
      setAnswers(dataset[currentId as TypeId].answers as TypeAnswer[])
    }, 500)
  }, [currentId, dataset])

  return (
    <SSection>
      <SBox>
        <Chats chats={chats} />
        <AnswersList
          answers={answers}
          onClickAnswer={onClickAnswer}
        />
        <FormDialog open={open} setOpen={setOpen} />
      </SBox>
    </SSection>
  )
}

export default App

const SSection = styled(Box)({
  position: 'relative',
  height: '100vh',
  width: '100%',
})

const SBox = styled(Box)({
  bgcolor: 'white',
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: '4px',
  boxSizing: 'border-box',
  height: '592px',
  maxWidth: '432px',
  padding: '0 1rem',
  width: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})
