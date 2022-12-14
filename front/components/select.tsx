import { Poppins } from '@next/font/google'
import { useState, useRef } from 'react'
import { IconType } from 'react-icons'
import { TbChevronDown, TbArrowRight } from 'react-icons/tb'
import classNames from 'classnames'
import { useClickOutside } from '../hooks/useClickOutside'

import Button from "./button"

import styles from '../styles/components/select.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface SelectProps {
  icon: IconType
  value: any
  options: any[]
  formatter?: (value: any) => string
  onSelect?: (value: any) => void
  width?: number | string
  confirmButton?: boolean
  placeholder?: string
}

export default function Select({
  icon: Icon,
  value,
  options,
  formatter = (value: any) => String(value),
  onSelect,
  width,
  confirmButton,
  placeholder
}: SelectProps) {
  const [placeholderStatus, setPlaceholderStatus] = useState(!!placeholder)
  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef(null)
  useClickOutside(selectRef, () => setIsOpen(false))

  function toggleOpen() {
    setIsOpen(!isOpen)
  }

  function handleOnClick(option: any) {
    !!placeholder && setPlaceholderStatus(false)
    onSelect && onSelect(option)
    setIsOpen(false)
  }

  const selectStyle = classNames({
    [styles.container]: true,
    [styles.extended]: isOpen
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
    <div className={selectStyle} ref={selectRef}>
      <div className={styles.button} onClick={toggleOpen}>
        <Icon />
        <p
          className={valueStyle}
          style={{ width: width || "min-content" }}
        >
          {placeholderStatus ? placeholder : formatter(value)}
        </p>
        <TbChevronDown className={chevronStyle} />
        {confirmButton && <Button icon={TbArrowRight} />}
      </div>
      <ol>
        {options.map((option, idx) => (
          <li key={idx} className={optionStyle(option)}>
            <button
              className={poppins.className}
              onClick={() => handleOnClick(option)}
            >
              {formatter(option)}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
