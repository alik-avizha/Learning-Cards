import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { DeleteIcon, Eye, NotEye, Search } from '../../../assets/icons'
import { Typography } from '../typography'

import s from './textfield.module.scss'

export type TextFieldProps = {
  type: 'default' | 'password' | 'searchType'
  errorMessage?: string
  placeholder?: string
  disableValue?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    errorMessage,
    placeholder = 'Some text',
    type = 'default',
    disableValue = false,
    ...restProps
  }) => {
    const [showPassword, setShowPassword] = useState(true)
    const [value, setValue] = useState('')

    const finalType = getType(type, showPassword)

    const inputStyle = (type: 'default' | 'password' | 'searchType') => {
      if (type === 'searchType') {
        return { paddingLeft: '2.56rem', paddingRight: '35px' }
      } else if (type === 'password') {
        return { paddingRight: '35px' }
      } else {
        return {}
      }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
    }

    return (
      <>
        <div className={s.fieldContainer}>
          {type === 'searchType' && (
            <span className={s.search}>
              <Search fill={disableValue ? '#4c4c4c' : '#808080'} />
            </span>
          )}
          <input
            className={`${s.field} ${errorMessage ? s.error : ''}`}
            placeholder={placeholder}
            type={finalType}
            disabled={disableValue}
            onChange={onChangeHandler}
            style={inputStyle(type)}
            value={value}
            {...restProps}
          />
          {type === 'password' && (
            <button
              className={s.buttonAction}
              type={'button'}
              disabled={disableValue}
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? (
                <Eye fill={disableValue ? '#4c4c4c' : '#fff'} />
              ) : (
                <NotEye fill={disableValue ? '#4c4c4c' : '#fff'} />
              )}
            </button>
          )}
          {type === 'searchType' && (
            <button
              className={s.buttonAction}
              type={'button'}
              disabled={disableValue}
              onClick={() => setValue('')}
            >
              <DeleteIcon fill={disableValue ? '#4c4c4c' : '#808080'} />
            </button>
          )}
        </div>
        <Typography variant="body1" className={s.errorMessage}>
          {errorMessage}
        </Typography>
      </>
    )
  }
)

function getType(type: string, showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
