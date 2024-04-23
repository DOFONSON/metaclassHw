import style from './styles/Readme.module.scss'

interface ReadmeProps {
    data: string | undefined
}
const Readme: React.FC<ReadmeProps> = ({ data }) => {
    if (data == undefined) {
        return
    }
    let text = data?.replace(/\n/g, '<br>');

    let ftext = text?.split('*') || []
    for (let i = 1; i < ftext.length; i++) {
        if (i == 0) {
            console.log(ftext[i]);
            ftext[i] = ftext[i] + `<ul class=${style.listik}>`
        } else {
            ftext[i] = '<li>' + ftext[i] + '</li>';
        }
        if (i == ftext.length - 2) {
            ftext[i] += '</ul>'
        }
    }
    let fintext = ftext.join('')
    let finatext = fintext.split('<br>')
    finatext[0] = `<span class=${style.readme__tite_title}>` + finatext[0] + '</span>'
    let finaltext = finatext.join('<br>')
    return (
        <div className={style.readme}>
            <h2 className={style.readme__title}>README.md</h2>
            <div className={style.readme__main}>
                <p dangerouslySetInnerHTML={{ __html: finaltext || '' }} />

            </div>
        </div>
    )
}

export default Readme;
