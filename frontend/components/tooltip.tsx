import { Poppins } from '@next/font/google'
import { ReactNode, useState } from 'react'
import classNames from 'classnames'

import styles from '../styles/components/tooltip.module.css'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

interface TooltipProps {
  label: string
  labelPosition?: "bottom" | "top" | "bottom-left"
  children: ReactNode
}

export default function Tooltip({ label, labelPosition = "top", children }: TooltipProps) {
  const [labelOn, setLabelOn] = useState(false)

  const labelStyle = classNames({
    [poppins.className]: true,
    [styles.label]: true,
    [styles.labelTop]: labelPosition === "top",
    [styles.labelBottom]: labelPosition === "bottom",
    [styles.labelBottomLeft]: labelPosition === "bottom-left",
  })

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setLabelOn(true)}
      onMouseLeave={() => setLabelOn(false)}
    >
      {labelOn && <label className={labelStyle}>{label}</label>}
      {children}
    </div>
  )
}
