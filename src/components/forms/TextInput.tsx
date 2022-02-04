import { TextField } from '@mui/material'
import { ChangeEvent, HTMLInputTypeAttribute, memo, VFC } from 'react'

type Props = {
  label: string
  multiline?: boolean
  rows?: number
  value: string
  type: HTMLInputTypeAttribute
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput: VFC<Props> = (props) => {
  const { label, multiline = false, rows = 1, value, type, onChange } = props
  return (
    <>
      <TextField
        variant="standard"
        fullWidth
        margin={'dense'}
        label={label}
        multiline={multiline}
        rows={rows}
        value={value}
        type={type}
        onChange={onChange}
      />
    </>
  )
}

export default memo(TextInput)
