import React from "react"
import Arrow from "./Arrow"

type ArrowButtonProps = {
    side: string;
    disabled?: boolean;
    onClick: Function;

}

const ArrowButton: React.FC<ArrowButtonProps> = ({ side, disabled, onClick }) => {
    const rotation = side === 'left' ? 180 : 0;
    let btnNum = side === 'left' ? -1 : -2
    return <button className={"arrowBtn " + (side == 'left' ? 'arrowBtn--left' : 'arrowBtn--right')} onClick={() => onClick(btnNum)} disabled={disabled}>
        <Arrow rotation={rotation} />
    </button>
}

export default ArrowButton