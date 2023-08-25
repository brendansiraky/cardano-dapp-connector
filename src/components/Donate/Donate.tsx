import { useState } from 'react'

import styles from './Donate.module.scss'

type DonateProps = {
    onDonate: (amount: number) => void
}

export const Donate: React.FC<DonateProps> = ({ onDonate }) => {
    const [quantity, setQuantity] = useState(1.75)

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
                <input
                    type='number'
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                    placeholder='Enter Amount'
                />
            </div>
            <button onClick={() => onDonate(quantity)}>Donate Ada</button>
        </div>
    )
}