import React from "react"

type ArrowButtonProps = {
    onClick: (e: MouseEvent) => void
    color: string
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, color }) => {
    return <button onClick={() => onClick} color={color}></button>
}

export default ArrowButton