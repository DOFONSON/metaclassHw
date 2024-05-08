import React from "react";

type ArrowProps = {
    rotation: number;
    color?: string
}

const Arrow: React.FC<ArrowProps> = ({ rotation, color }) => {
    return (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotation}deg)` }}>
            <path d="M12.38 26.5599L21.0733 17.8666C22.1 16.8399 22.1 15.1599 21.0733 14.1333L12.38 5.43994" stroke={color ? color : "#151411"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
export default Arrow 