import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
  VFC,
} from 'react'
import { TextInput } from '.'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const FormDialog: VFC<Props> = (props) => {
  const { open, setOpen } = props
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    },
    [setName]
  )

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    [setEmail]
  )

  const onChangeDescription = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value)
    },
    [setDescription]
  )

  const validateEmailFormat = (email: string) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
  }

  const validateRequiredInput = (...args: string[]) => {
    let isBlank = false
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === '') {
        isBlank = true
      }
    }
    return isBlank
  }
  // Slackに問い合わせがあったことを通知する
  const submitForm = () => {
    const isBlank = validateRequiredInput(name, email, description)
    const isValidEmail = validateEmailFormat(email)

    if (isBlank) {
      alert('必須入力欄が空白です。')
      return false
    } else if (!isValidEmail) {
      alert('メールアドレスの書式が異なります。')
      return false
    } else {
      const payload = {
        text:
          'お問い合わせがありました\n' +
          'お名前: ' +
          name +
          '\n' +
          'メールアドレス: ' +
          email +
          '\n' +
          '【問い合わせ内容】\n' +
          description,
      }
      // fetchメソッドでフォームの内容をSlackのIncoming Webhook URL に送信する
      fetch(process.env.REACT_APP_SLACK_WEBHOOK_URL as string, {
        method: 'POST',
        body: JSON.stringify(payload),
      }).then(() => {
        alert('送信が完了しました。追ってご連絡いたします🙌')
        setDescription('')
        setEmail('')
        setName('')
        return handleClose()
      })
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>お問い合わせフォーム</DialogTitle>
        <DialogContent>
          <TextInput
            label={'名前(必須)'}
            value={name}
            type={'text'}
            onChange={onChangeName}
          />
          <TextInput
            label={'メールアドレス(必須)'}
            value={email}
            type={'email'}
            onChange={onChangeEmail}
          />
          <TextInput
            label={'お問い合わせ内容(必須)'}
            multiline={true}
            rows={5}
            value={description}
            type={'text'}
            onChange={onChangeDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={submitForm} color="primary">
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(FormDialog)
