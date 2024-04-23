import React from 'react';
import cn from 'clsx';
import styles from './styles/styles.module.scss'
export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    value?: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value, onChange, afterSlot, className, disabled, ...props }, ref) => {
        const handleChange = React.useCallback(
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                onChange(event.target.value)
            },
            [onChange]
        )

        return (
            <label className={className === 'search__input_input' ? 'srchinp_label' : ''}>
                <input
                    {...props}
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    type='text'
                    className={className === 'search__input_input' ? cn(styles.srchinp_input, styles.super_input) : styles.super_input}
                />
                {afterSlot && <div className={styles.input_icon}></div>}
            </label >
        );
    }
);

export default Input;
