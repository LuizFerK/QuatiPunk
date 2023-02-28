import {
  TbBulb,
  TbPaint,
  TbSettings,
  TbPlugConnected,
  TbBrandAsana,
  TbNorthStar
} from 'react-icons/tb'
import classNames from 'classnames'

import styles from '../styles/components/category.module.css'
import Tooltip from './tooltip'

interface CategoryProps {
  type: Category
  labelPosition?: "bottom" | "top"
  selectable?: boolean
  selected?: boolean
}

export default function Category({ type, selectable, labelPosition, selected }: CategoryProps) {
  const categoryIcon = {
    electrical: <TbBulb />,
    paints: <TbPaint />,
    hardware: <TbSettings />,
    connections: <TbPlugConnected />,
    cement: <TbBrandAsana />,
    finishes: <TbNorthStar />,
  }

  const categoryLabel = {
    electrical: "Eletrônicos",
    paints: "Tintas",
    hardware: "Ferragens",
    connections: "Conexões e Reparos",
    cement: "Cimento e Argamassas",
    finishes: "Acabamentos",
  }

  const categoryStyle = classNames({
    [styles.container]: true,
    [styles[type]]: true,
    [styles.selectable]: selectable,
    [styles.selected]: selectable && selected,
    [styles.white]: selected
  })

  return (
    <Tooltip label={categoryLabel[type]} labelPosition={labelPosition}>
      <div className={categoryStyle}>
        {categoryIcon[type]}
      </div>
    </Tooltip>
  )
}
