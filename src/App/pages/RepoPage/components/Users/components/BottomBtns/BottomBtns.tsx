import style from '../../styles/Users.module.scss'
import cn from 'clsx'
type BtnProps = {
    amount: number,
    onClick: Function
}

const BottomBtns: React.FC<BtnProps> = ({ amount, onClick }) => {
    let arr = []
    for (let i = 0; i < amount; i++) {
        let id = amount - i
        arr.push(
            {
                val: <button className={cn(style.repos_bottom_btn, i == 0 ? style.repos_bottom_btn_active : '')} onClick={() => onClick(i + 1)}>{i + 1}</button>,
                id: id
            }
        )
    }
    return (
        <>
            {arr.map((btn) => {
                return <li key={btn.id}>{btn.val}</li>
            })}
        </>
    )
}

export default BottomBtns