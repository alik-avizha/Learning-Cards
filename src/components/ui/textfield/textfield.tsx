import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Eye, NotEye, Search } from '../../../assets/icons'
import { Typography } from '../typography'

import s from './textfield.module.scss'

export type TextFieldProps = {
  type: 'default' | 'password' | 'search'
  errorMessage?: string
  placeholder?: string
  disableValue?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ errorMessage, placeholder = 'TextField', type, disableValue = false, ...restProps }) => {
    const [showPassword, setShowPassword] = useState(true)

    const finalType = getType(type, showPassword)

    const inputStyle = (type: 'default' | 'password' | 'search') => {
      if (type === 'search') {
        return { paddingLeft: '2.56rem' }
      } else if (type === 'password') {
        return { paddingRight: '35px' }
      } else {
        return {}
      }
    }

    return (
      <>
        <div className={s.fieldContainer}>
          {type === 'search' && (
            <span className={s.search}>
              <Search fill={disableValue ? '#4c4c4c' : '#808080'} />
            </span>
          )}
          <input
            className={`${s.field} ${errorMessage ? s.error : ''}`}
            placeholder={placeholder}
            type={finalType}
            disabled={disableValue}
            style={inputStyle(type)}
            {...restProps}
          />
          {type === 'password' && (
            <button
              className={s.showPassword}
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
