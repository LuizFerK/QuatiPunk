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

interface CategoryProps {
  type: Category
  selectable?: boolean
  selected?: boolean
}

export default function Category({ type, selectable, selected }: CategoryProps) {
  const categoryIcon = {
    electrical: <TbBulb />,
    paints: <TbPaint />,
    hardware: <TbSettings />,
    connections: <TbPlugConnected />,
    cement: <TbBrandAsana />,
    finishes: <TbNorthStar />,
  }

  const categoryStyle = classNames({
    [styles.container]: true,
    [styles[type]]: true,
    [styles.selectable]: selectable,
    [styles.selected]: selectable && selected,
    [styles.white]: selected
  })

  return (
    <div className={categoryStyle}>
      {categoryIcon[type]}
    </div>
  )
}
