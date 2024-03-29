import {
  TbCreditCard,
  TbCash,
} from 'react-icons/tb'
import classNames from 'classnames'

import styles from '../styles/components/payment.module.css'
import Tooltip from './tooltip'

interface PaymentProps {
  type: Payment
  selectable?: boolean
  selected?: boolean
}

interface PixIconProps {
  color: string
}

const PixIcon = ({ color }: PixIconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4 20.5894L10.3996 20.589L7.7837 17.9801C7.98354 17.925 8.16336 17.8595 8.32647 17.7854C8.83877 17.5527 9.13444 17.2566 9.3145 17.0763C9.31989 17.0709 9.32518 17.0656 9.33036 17.0604L12.13 14.2607L14.9197 17.0504C15.3477 17.4784 15.795 17.7507 16.2582 17.9184L13.5804 20.589L13.58 20.5894C13.1582 21.0107 12.5863 21.2474 11.99 21.2474C11.3938 21.2474 10.8219 21.0107 10.4 20.5894ZM13.61 3.41071L13.6104 3.41109L16.2804 6.07392C15.7987 6.24246 15.3305 6.52232 14.8945 6.97493L12.13 9.73939L9.33036 6.93972C9.32294 6.93229 9.31523 6.92454 9.30722 6.9165C9.14285 6.75146 8.85434 6.46174 8.35595 6.22916C8.19169 6.1525 8.00981 6.08416 7.80706 6.02661L10.4296 3.41109L10.43 3.41071C10.8519 2.98935 11.4238 2.75269 12.02 2.75269C12.6163 2.75269 13.1882 2.98935 13.61 3.41071Z" stroke={color} strokeWidth="1.5"/>
      <path d="M20.5785 10.3791L20.5807 10.3813C21.0098 10.8087 21.2522 11.3887 21.255 11.9943C21.2579 12.5993 21.0214 13.1809 20.5972 13.6122C20.5967 13.6126 20.5962 13.6131 20.5958 13.6136L18.5684 15.6499H17.62C17.2708 15.6499 16.9411 15.5103 16.7004 15.2696L13.6904 12.2596C13.5889 12.1581 13.4797 12.0688 13.3648 11.9916C13.4761 11.9159 13.5818 11.8288 13.6804 11.7303L16.6804 8.73028L16.6874 8.7233L16.6941 8.71614C16.9146 8.48376 17.254 8.33995 17.6 8.33995H18.5484L20.5785 10.3791ZM10.5895 11.7399C10.6886 11.8354 10.7955 11.921 10.9087 11.996C10.7962 12.0722 10.6893 12.16 10.5897 12.2596L7.57352 15.2758C7.31755 15.5237 6.98435 15.6599 6.65005 15.6599H5.48166L3.41153 13.5808L3.41071 13.5799C2.98935 13.1581 2.75269 12.5862 2.75269 11.9899C2.75269 11.3937 2.98935 10.8218 3.41071 10.3999L3.41153 10.3991L5.48166 8.31995H6.64005C6.98906 8.31995 7.31866 8.45944 7.55929 8.69986C7.55943 8.7 7.55958 8.70014 7.55972 8.70028L10.5788 11.7294L10.5841 11.7347L10.5895 11.7399Z" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}

export default function Payment({ type, selectable, selected }: PaymentProps) {
  const paymentIcon = {
    card: <TbCreditCard />,
    cash: <TbCash />,
    pix: <PixIcon color={selected ? "#FFFFFF" : "#7E7E7E"} />
  }

  const paymentLabel = {
    card: "Cartão",
    cash: "Dinheiro",
    pix: "Pix"
  }

  const paymentStyle = classNames({
    [styles.container]: true,
    [styles[type]]: true,
    [styles.selectable]: selectable,
    [styles.selected]: selected
  })

  return (
    <Tooltip label={paymentLabel[type]}>
      <div className={paymentStyle}>
        {paymentIcon[type]}
      </div>
    </Tooltip>
  )
}
