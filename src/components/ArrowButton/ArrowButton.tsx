import React from "react"
import Arrow from "./Arrow"
import cn from 'clsx'
import style from './styles/ArrowButton.module.scss'
type ArrowButtonProps = {
    side: string;
    disabled?: boolean;
    onClick: Function;
    color?: string
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ side, disabled, onClick, color }) => {
    const rotation = side === 'left' ? 180 : 0;
    let btnNum = side === 'left' ? -1 : -2
    return <button className={cn(style.arrowBtn, (side == 'left' ? 'arrowBtn--left' : 'arrowBtn--right'))} onClick={() => onClick(btnNum)} disabled={disabled}>
        <Arrow rotation={rotation} color={color} />
    </button>
}

export default ArrowButton