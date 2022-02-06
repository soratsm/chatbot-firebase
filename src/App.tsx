import { useCallback, useEffect, useState } from 'react'
import { Box, styled } from '@mui/material'

import { AnswersList, Chats } from 'components'
import { FormDialog } from 'components/forms'
import { TypeAnswer, TypeChats } from 'types'
import { useSetDataset } from './api/useSetDataset'

const App = () => {
  const [answers, setAnswers] = useState<TypeAnswer[]>([])
  const [answer, setAnswer] = useState('')
  const [chats, setChats] = useState<TypeChats[]>([])
  const [currentId, setCurrentId] = useState('init')
  const [open, setOpen] = useState(false)
  const { getCollections, dataset } = useSetDataset()

  // firestoreからデータセット取得
  useEffect(() => {
    getCollections()
  }, [])

  // 回答をクリックした際にnextIdの値により処理を振り分け
  useEffect(() => {
    // ユーザーチャット
    const answerChats =
      answer === '' || currentId === 'init'
        ? [...chats]
        : [...chats, { text: answer, isQuestion: false }]
    setChats(answerChats)

    // ボットチャット
    setTimeout(() => {
      // currentIdに一致したidのindexを取得する
      const passIndex = dataset.findIndex(function (element) {
        return element.id === currentId
      })
      // ボットチャットの投稿と次の回答を表示
      const questionChats = [
        ...answerChats,
        { text: dataset[passIndex].question, isQuestion: true },
      ]
      setChats(questionChats)
      setAnswers(dataset[passIndex].answers as TypeAnswer[])
    }, 500)
  }, [currentId, dataset])

  // 回答をクリックした際にnextIdの値により処理を振り分け
  const onClickAnswer = useCallback((answer: TypeAnswer) => {
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
  }, [])

  return (
    <SSection>
      <SBox>
        <Chats chats={chats} />
        <AnswersList answers={answers} onClickAnswer={onClickAnswer} />
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
