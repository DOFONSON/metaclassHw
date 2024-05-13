import { useState, useEffect } from 'react';
import Card from '../Card';
import BottomBtns from './components/BottomBtns/BottomBtns';
import ArrowButton from '../../../../../components/ArrowButton';
import style from './Users.module.scss'
import btnStyle from './components/BottomBtns/BottomBtns.module.scss'
import { observer } from 'mobx-react-lite';
import LoadingStub from './components/LoadingStub';
import DefaultStub from './components/DefaultStub';
import ErrorStub from './components/ErrorStub';
import { RenderReposStore } from '../../../../../store/RenderReposStore/RenderReposStore';
import React from 'react';

interface UsersProps {
    ReposStore: RenderReposStore;
}

const Users: React.FC<UsersProps> = ({ ReposStore }) => {
    const [arwBtnDisL, setArwBtnDisL] = useState(true);
    const [arwBtnDisR, setArwBtnDisR] = useState(false);
    const [btnsCount, setBtnsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(ReposStore.page);
    const reposPerPage = 9;
    let totalPages = Math.ceil(ReposStore.renderedRepos.order.length / reposPerPage);
    useEffect(() => {
        ReposStore.renderedRepos
    }, [ReposStore.meta, totalPages]);

    useEffect(() => {
        const newBtnsCount = Math.ceil(ReposStore.renderedRepos.order.length / reposPerPage);
        setBtnsCount(newBtnsCount);
        setCurrentPage(ReposStore.page)
    }, [ReposStore.meta, ReposStore.renderedRepos.order.length]);

    useEffect(() => {
        checkBtn(ReposStore.page + 1);
    }, [BottomBtns]);
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

        let btnArr = document.querySelectorAll('.' + btnStyle.repos_bottom_btn);

        for (let i = 0; i < btnArr.length; i++) {
            const element = btnArr[i];
            if (element.classList.contains(btnStyle.repos_bottom_btn_active)) {
                element.classList.remove(btnStyle.repos_bottom_btn_active);
                ReposStore.changePage(ind - 1)

                checkBtn(ind - 1);
                setCurrentPage(ReposStore.page)
                break;
            }
        }
        btnArr[ind - 1].classList.add(btnStyle.repos_bottom_btn_active);
    }
    useEffect(() => {
        setArwBtnDisL(currentPage === 0);
        setArwBtnDisR(currentPage === totalPages - 1);
    }, [currentPage, totalPages]);

    const nextPage = () => {
        let btnArr = document.querySelectorAll('.' + btnStyle.repos_bottom_btn);

        ReposStore.changePage(Math.min(ReposStore.page + 1, totalPages - 1))
        setCurrentPage(ReposStore.page);

        btnArr[currentPage].classList.remove(btnStyle.repos_bottom_btn_active);
        btnArr[currentPage + 1].classList.add(btnStyle.repos_bottom_btn_active);
    };

    const prevPage = () => {
        let btnArr = document.querySelectorAll('.' + btnStyle.repos_bottom_btn);

        ReposStore.changePage(Math.max(ReposStore.page - 1, 0))
        setCurrentPage(ReposStore.page);
        btnArr[currentPage].classList.remove(btnStyle.repos_bottom_btn_active);
        btnArr[currentPage - 1].classList.add(btnStyle.repos_bottom_btn_active);
    };

    return (
        <>
            {ReposStore.meta == 'success' ? (
                <div>
                    <ul className={style.repos}>
                        {ReposStore.renderedRepos.order
                            .slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage)
                            .map((repo: number) => (
                                <li key={ReposStore.renderedRepos.entities[repo].id}><Card id={ReposStore.renderedRepos.entities[repo].id} className={style.repo_card__link} image={ReposStore.renderedRepos.entities[repo].avatarUrl} captionSlot={ReposStore.renderedRepos.entities[repo].stargazersCount} dateSlot={ReposStore.renderedRepos.entities[repo].updatedAt} title={ReposStore.renderedRepos.entities[repo].name} contentSlot={ReposStore.renderedRepos.entities[repo].description} /></li>
                            ))}
                    </ul>

                    <div className={style.repos_bottom_btns}>
                        <ArrowButton side='left' disabled={arwBtnDisL} onClick={prevPage}></ArrowButton>
                        <ul className={style.repos_bottom_btns__btns_list}>
                            <BottomBtns amount={btnsCount} onClick={(index: number) => btnChanger(index)} startIndex={ReposStore.page}></BottomBtns>
                        </ul>
                        <ArrowButton side='right' disabled={arwBtnDisR} onClick={nextPage}></ArrowButton>
                    </div>
                </div >
            ) : ReposStore.meta == 'initial' ? <DefaultStub /> : ReposStore.meta == 'loading' ? <LoadingStub /> : <ErrorStub />
            }
        </>
    );
}

export default observer(Users);