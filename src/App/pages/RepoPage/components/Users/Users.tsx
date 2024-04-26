import { useState, useEffect } from 'react';
import Card from '../Card';
import BottomBtns from './components/BottomBtns/BottomBtns';
import ArrowButton from '../../../../../components/ArrowButton';
import style from './styles/Users.module.scss'
import { observer } from 'mobx-react-lite';
import repoStore from '../../../../../store/RenderReposStore';
const Users: React.FC = () => {
    const [arwBtnDisL, setArwBtnDisL] = useState(true);
    const [arwBtnDisR, setArwBtnDisR] = useState(false);
    const [btnsCount, setBtnsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const reposPerPage = 9;

    let totalPages = Math.ceil(repoStore.renderedRepos.order.length / reposPerPage);

    useEffect(() => {
        repoStore

    }, []);
    useEffect(() => {
        repoStore.renderedRepos

    }, [repoStore.meta, totalPages]);

    useEffect(() => {
        const newBtnsCount = Math.ceil(repoStore.renderedRepos.order.length / 9);
        setBtnsCount(newBtnsCount);
    }, [repoStore.meta, repoStore.renderedRepos.order.length]);

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
    let btnArr = document.querySelectorAll('.' + style.repos_bottom_btn);

    const btnChanger = (ind: number) => {
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
    useEffect(() => {
        setArwBtnDisL(currentPage === 0);
        setArwBtnDisR(currentPage === totalPages - 1);
    }, [currentPage, totalPages]);

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
        btnArr[currentPage].classList.remove(style.repos_bottom_btn_active);
        btnArr[currentPage + 1].classList.add(style.repos_bottom_btn_active);
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
        btnArr[currentPage].classList.remove(style.repos_bottom_btn_active);
        btnArr[currentPage - 1].classList.add(style.repos_bottom_btn_active);
    };

    return (
        <>
            {repoStore.meta == 'success' ? (
                <div>
                    <ul className={style.repos}>
                        {repoStore.renderedRepos.order
                            .slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage)
                            .map((repo: number) => (
                                <li key={repoStore.renderedRepos.entities[repo].id}><Card id={repoStore.renderedRepos.entities[repo].id} className={style.repo_card__link} image={repoStore.renderedRepos.entities[repo].avatarUrl} captionSlot={repoStore.renderedRepos.entities[repo].stargazers_count} dateSlot={repoStore.renderedRepos.entities[repo].updatedAt} title={repoStore.renderedRepos.entities[repo].name} contentSlot={repoStore.renderedRepos.entities[repo].description} /></li>
                            ))}
                    </ul>

                    <div className={style.repos_bottom_btns}>
                        <ArrowButton side='left' disabled={arwBtnDisL} onClick={prevPage}></ArrowButton>
                        <ul className={style.repos_bottom_btns__btns_list}>
                            <BottomBtns amount={btnsCount} onClick={(index: number) => btnChanger(index)}></BottomBtns>
                        </ul>
                        <ArrowButton side='right' disabled={arwBtnDisR} onClick={nextPage}></ArrowButton>
                    </div>
                </div>
            ) : repoStore.meta == 'initial' ?
                (<div className={style.stub}>
                    <h2 className={style.stub__title}>Select a company to view its repositories</h2>
                </div>) : repoStore.meta == 'loading' ?
                    (<div className="loading_stub">
                        <div className={style.box}>
                            <div className={style.cat}>
                                <div className={style.body}></div>
                                <div className={style.tail}></div>
                                <div className={style.head}></div>
                            </div>
                        </div>
                    </div>
                    ) :
                    (
                        <div className={style.error_stub}>
                            <h2>Sorry... Can't find company with that title</h2>
                        </div>
                    )
            }
        </>
    );
}

export default observer(Users);