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
                val: <button className={"repos-bottom-btn " + (i == 0 ? 'repos-bottom-btn--active' : '')} onClick={() => onClick(i + 1)}>{i + 1}</button>,
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