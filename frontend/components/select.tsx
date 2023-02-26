import { Poppins } from '@next/font/google'
import { useState, useRef, CSSProperties } from 'react'
import { IconType } from 'react-icons'
import { TbChevronDown, TbArrowRight } from 'react-icons/tb'
import classNames from 'classnames'
import { useClickOutside } from '../hooks/useClickOutside'

import Button from "./button"

import styles from '../styles/components/select.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface SelectProps {
  icon: IconType
  label?: string
  value: any
  options: any[]
  formatter?: (value: any) => string
  onSelect?: (value: any) => void
  width?: number | string
  confirmButton?: boolean
  placeholder?: string
  style?: CSSProperties
  disabled?: boolean
  nullable?: boolean
}

export default function Select({
  icon: Icon,
  label,
  value,
  options,
  formatter = (value: any) => String(value),
  onSelect,
  width,
  confirmButton,
  placeholder,
  style,
  disabled,
  nullable
}: SelectProps) {
  const [placeholderStatus, setPlaceholderStatus] = useState(!!placeholder)
  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef(null)
  useClickOutside(selectRef, () => setIsOpen(false))

  function toggleOpen() {
    !disabled && setIsOpen(!isOpen)
  }

  function handleOnClick(option: any) {
    !!placeholder && setPlaceholderStatus(!!nullable && option === value)
    onSelect && onSelect(nullable && option === value ? "" : option)
    setIsOpen(false)
  }

  const labelStyle = classNames({
    [poppins.className]: true,
    [styles.label]: true
  })

  const selectStyle = classNames({
    [styles.container]: true,
    [styles.extended]: isOpen,
    [styles.width100]: width === "100%"
  })
  
  const buttonStyle = classNames({
    [styles.button]: true,
    [styles.disabled]: disabled
  })

  const valueStyle = classNames({
    [poppins.className]: true,
    [styles.placeholder]: placeholderStatus
  })

  const chevronStyle = classNames({
    [styles.rotated]: isOpen
  })

  const optionStyle = (opt: any) => classNames({
    [styles.option]: true,
    [styles.selected]: formatter(value) === formatter(opt)
  })

  return (
    <div style={style}>
      {label && <label className={labelStyle}>{label}</label>}
      <div className={selectStyle} ref={selectRef}>
        <div className={buttonStyle} onClick={toggleOpen}>
          <Icon />
          <p
            className={valueStyle}
            style={{ width: width || "min-content" }}
          >
            {placeholder && placeholderStatus ? placeholder : formatter(value)}
          </p>
          {!disabled ? <TbChevronDown className={chevronStyle} /> : <div style={{ marginRight: 20 }} />}
          {confirmButton && <Button icon={TbArrowRight} />}
        </div>
        <ol>
          {["Anônimo", ...options].map((option, idx) => (
            <li key={idx} className={optionStyle(option)}>
              <button
                type="button"
                className={poppins.className}
                onClick={() => handleOnClick(option)}
              >
                {formatter(option)}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
