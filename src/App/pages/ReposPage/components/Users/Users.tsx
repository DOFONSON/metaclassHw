import { useState, useEffect } from 'react';
import Card from '../Card';
import BottomBtns from './components/BottomBtns/BottomBtns';
import ArrowButton from '../../../../../components/ArrowButton';
import style from './Users.module.scss';
import btnStyle from './components/BottomBtns/BottomBtns.module.scss';
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
        ReposStore.renderedRepos;
        ReposStore.filterRepos(ReposStore.multiStore.selectedTags);
    }, [ReposStore.meta, ReposStore.multiStore.selectedTags]);

    useEffect(() => {
        const newBtnsCount = Math.ceil(ReposStore.renderedRepos.order.length / reposPerPage);
        setBtnsCount(newBtnsCount);
        setCurrentPage(ReposStore.page);
    }, [ReposStore.meta, ReposStore.renderedRepos.order.length]);

    useEffect(() => {
        checkBtn(ReposStore.page);
    }, [BottomBtns]);

    useEffect(() => {
        checkBtn(currentPage);
    }, [currentPage, totalPages]);

    const checkBtn = (i: number) => {
        setArwBtnDisL(i === 1);
        setArwBtnDisR(i === btnsCount);
    };

    const smoothScroll = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const btnChanger = (ind: number) => {
        let btnArr = document.querySelectorAll('.' + btnStyle.repos_bottom_btn);
        for (let i = 0; i < btnArr.length; i++) {
            const element = btnArr[i];
            if (element.classList.contains(btnStyle.repos_bottom_btn_active)) {
                element.classList.remove(btnStyle.repos_bottom_btn_active);
                ReposStore.changePage(ind);

                checkBtn(ind);
                setCurrentPage(ReposStore.page);
                break;
            }
        }
        smoothScroll();
        btnArr[ind - 1].classList.add(btnStyle.repos_bottom_btn_active);
    };

    useEffect(() => {
        setArwBtnDisL(currentPage === 1);
        setArwBtnDisR(currentPage === totalPages);
    }, [currentPage, totalPages]);

    const nextPage = () => {
        let btnArr = document.querySelectorAll('.' + btnStyle.repos_bottom_btn);
        ReposStore.changePage(Math.min(ReposStore.page + 1, totalPages));
        setCurrentPage(ReposStore.page);

        btnArr[currentPage - 1].classList.remove(btnStyle.repos_bottom_btn_active);
        btnArr[currentPage].classList.add(btnStyle.repos_bottom_btn_active);
        smoothScroll();
    };

    const prevPage = () => {
        let btnArr = document.querySelectorAll('.' + btnStyle.repos_bottom_btn);
        ReposStore.changePage(Math.max(ReposStore.page - 1, 1));
        setCurrentPage(ReposStore.page);

        btnArr[currentPage - 1].classList.remove(btnStyle.repos_bottom_btn_active);
        btnArr[currentPage - 2].classList.add(btnStyle.repos_bottom_btn_active);
        smoothScroll();
    };

    return (
        <>
            {ReposStore.meta === 'success' ? (
                <div>
                    <ul className={style.repos}>
                        {ReposStore.renderedRepos.order
                            .slice((currentPage - 1) * reposPerPage, currentPage * reposPerPage)
                            .map((repo: number) => (
                                <li key={ReposStore.renderedRepos.entities[repo].id}>
                                    <Card
                                        id={ReposStore.renderedRepos.entities[repo].id}
                                        className={style.repo_card__link}
                                        image={ReposStore.renderedRepos.entities[repo].avatarUrl}
                                        captionSlot={ReposStore.renderedRepos.entities[repo].stargazersCount}
                                        dateSlot={ReposStore.renderedRepos.entities[repo].updatedAt}
                                        title={ReposStore.renderedRepos.entities[repo].name}
                                        contentSlot={ReposStore.renderedRepos.entities[repo].description}
                                    />
                                </li>
                            ))}
                    </ul>

                    <div className={style.repos_bottom_btns}>
                        <ArrowButton side='left' disabled={arwBtnDisL} onClick={prevPage} />
                        <ul className={style.repos_bottom_btns__btns_list}>
                            <BottomBtns amount={btnsCount} onClick={(index: number) => btnChanger(index)} startIndex={ReposStore.page - 1} />
                        </ul>
                        <ArrowButton side='right' disabled={arwBtnDisR} onClick={nextPage} />
                    </div>
                </div>
            ) : ReposStore.meta === 'initial' ? (
                <DefaultStub />
            ) : ReposStore.meta === 'loading' ? (
                <LoadingStub />
            ) : (
                <ErrorStub />
            )}
        </>
    );
};

export default observer(Users);
