import { useState, useEffect } from 'react';
import Card from '../Card';
import BottomBtns from './components/BottomBtns/BottomBtns';
import ArrowButton from '../../../../../components/ArrowButton';
import { Repo } from '../../../../../config/routes';
import style from './styles/Users.module.scss'
import { observer } from 'mobx-react-lite';
import repoStore from '../../../../../store/RenderReposStore';
const Users: React.FC = () => {
    const [arwBtnDisL, setArwBtnDisL] = useState(true);
    const [arwBtnDisR, setArwBtnDisR] = useState(false);
    const [btnsCount, setBtnsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const reposPerPage = 9;

    const totalPages = Math.ceil(repoStore.repos.length / reposPerPage);
    const lastPageCount = repoStore.repos.length % reposPerPage === 0 ? reposPerPage : repoStore.repos.length % reposPerPage;

    useEffect(() => {
        repoStore
    }, []);
    useEffect(() => {
        repoStore.repos
    }, [repoStore.repos]);

    useEffect(() => {
        const newBtnsCount = Math.ceil(repoStore.repos.length / 9);
        setBtnsCount(newBtnsCount);
    }, [repoStore.repos]);

    useEffect(() => {
        checkBtn(0);
    }, [btnsCount]);
    useEffect(() => {
        checkBtn(currentPage);
    }, [currentPage, totalPages]);

    const checkBtn = (i: number) => {
        if (i === 0) {
            setArwBtnDisL(true);
        } else {
            setArwBtnDisL(false);
        }

        if (i === btnsCount - 1) {
            setArwBtnDisR(true);
        } else {
            setArwBtnDisR(false);
        }
    }

    const btnChanger = (ind: number) => {
        let btnArr = document.querySelectorAll('.' + style.repos_bottom_btn);
        console.log(btnArr);

        if (ind === 6) {
            for (let i = 0; i < btnArr.length; i++) {
                let element = btnArr[i];
                if (element.classList.contains(style.repos_bottom_btn_active)) {
                    element.classList.remove(style.repos_bottom_btn_active);
                    console.log(btnArr[i - 1].classList);
                    btnArr[i - 1].classList.add(style.repos_bottom_btn_active);
                    checkBtn(i - 1);
                    setCurrentPage(currentPage - 1);
                    break;
                }
            }

        } else if (ind === 7) {
            for (let i = 0; i < btnArr.length; i++) {
                let element = btnArr[i];
                if (element.classList.contains(style.repos_bottom_btn_active)) {
                    element.classList.remove(style.repos_bottom_btn_active);
                    btnArr[i + 1].classList.add(style.repos_bottom_btn_active);
                    checkBtn(i + 1);
                    setCurrentPage(currentPage + 1);
                    break;
                }
            }

        }
        else {
            for (let i = 0; i < btnArr.length; i++) {
                const element = btnArr[i];
                if (element.classList.contains(style.repos_bottom_btn_active)) {
                    element.classList.remove(style.repos_bottom_btn_active);
                    checkBtn(ind - 1);
                    setCurrentPage(ind - 1)
                    break;
                }
            }
            btnArr[ind - 1].classList.add(style.repos_bottom_btn_active);
        }
    }

    return (
        <>
            <ul className={style.repos}>
                {repoStore.repos
                    .slice(currentPage === totalPages - 1 ? (currentPage - 1) * reposPerPage : currentPage * reposPerPage, currentPage === totalPages - 1 ? (currentPage - 1) * reposPerPage + lastPageCount : currentPage * reposPerPage + reposPerPage)
                    .map((repo: Repo) => (
                        <li key={repo.id}><Card id={repo.id} className={style.repo_card__link} image={repo.avatarUrl} captionSlot={repo.stargazers_count} dateSlot={repo.updatedAt} title={repo.name} contentSlot={repo.description} /></li>
                    ))}

            </ul>

            <div className={style.repos_bottom_btns}>
                <ArrowButton side='left' disabled={arwBtnDisL} onClick={() => btnChanger(6)}></ArrowButton>
                <ul className={style.repos_bottom_btns__btns_list}>
                    <BottomBtns amount={btnsCount} onClick={(index: number) => btnChanger(index)}></BottomBtns>
                </ul>
                <ArrowButton side='right' disabled={arwBtnDisR} onClick={() => btnChanger(7)}></ArrowButton>
            </div >
        </>
    );
}

export default observer(Users);