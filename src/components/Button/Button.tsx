import React from 'react';
import style from './styles.module.scss'
import cn from 'clsx'
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    className?: string;
    onClick?: Function;
    active?: Boolean
};

const Button: React.FC<ButtonProps> = ({ loading, onClick, disabled = false, children }) => {
    let handleMouseDown = () => {
        document.querySelector('.main-btn')?.classList.add('main-btn--active')
    }
    let handleMouseUp = () => {
        document.querySelector('.main-btn')?.classList.remove('main-btn--active')
    }
    return (
        <button
            className={cn(style.main_btn, loading && disabled ? style.main_btn_loading_dis : disabled ? style.main_btn_dis : 'main_btn_btn')}
            disabled={loading || disabled ? true : false}
            onClick={loading ? undefined : onClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {children}
        </button>
    );
};

export default Button;
