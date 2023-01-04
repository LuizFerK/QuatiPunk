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
}

export default function Category({ type }: CategoryProps) {
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
    [styles[type]]: true
  })

  return (
    <div className={categoryStyle}>
      {categoryIcon[type]}
    </div>
  )
}
