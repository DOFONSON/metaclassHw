import { useState, useEffect } from 'react';
import Card from '../Card';
import axios from 'axios';
import BottomBtns from './components/BottomBtns/BottomBtns';
import ArrowButton from '../../../../../components/ArrowButton';

type Data = {
    id?: string;
    stargazers_count?: number;
    description?: 'string';
    owner: {
        avatar_url?: 'string'
    };
    name?: string;
    updated_at: string;
}

type Repo = {
    id: number;
    stargazers_count: number;
    description: string;
    avatarUrl: 'string';
    updated_at: string;
    name: string;
}

const Users = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [arwBtnDisL, setArwBtnDisL] = useState(true);
    const [arwBtnDisR, setArwBtnDisR] = useState(false);
    const [btnsCount, setBtnsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const reposPerPage = 9;

    const totalPages = Math.ceil(repos.length / reposPerPage);
    const lastPageCount = repos.length % reposPerPage === 0 ? reposPerPage : repos.length % reposPerPage;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const result = await axios.get('https://api.github.com/orgs/ktsstudio/repos');
                const updatedRepos = result.data.map((raw: Data) => {
                    const dateUpdate = new Date(Date.parse(raw.updated_at));
                    const newUpdate = dateUpdate.getDay() + ' ' + months[dateUpdate.getMonth()];
                    return {
                        id: raw.id,
                        stargazers_count: raw.stargazers_count || 0,
                        description: raw.description,
                        avatarUrl: raw.owner.avatar_url,
                        name: raw.name,
                        updated_at: newUpdate
                    };
                });
                setRepos(updatedRepos);
            } catch (error) {
                console.error('Error fetching repos:', error);
            }
        };
        fetchRepos();
    }, []);

    useEffect(() => {
        const newBtnsCount = Math.ceil(repos.length / 9);
        setBtnsCount(newBtnsCount);
    }, [repos]);

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
        let btnArr = document.querySelectorAll('.repos-bottom-btn');

        if (ind === 6) {
            for (let i = 0; i < btnArr.length; i++) {
                let element = btnArr[i];
                if (element.classList.contains('repos-bottom-btn--active')) {
                    element.classList.remove('repos-bottom-btn--active');
                    console.log(btnArr[i - 1].classList);
                    btnArr[i - 1].classList.add('repos-bottom-btn--active');
                    checkBtn(i - 1);
                    setCurrentPage(currentPage - 1);
                    break;
                }
            }

        } else if (ind === 7) {
            for (let i = 0; i < btnArr.length; i++) {
                let element = btnArr[i];
                if (element.classList.contains('repos-bottom-btn--active')) {
                    element.classList.remove('repos-bottom-btn--active');
                    btnArr[i + 1].classList.add('repos-bottom-btn--active');
                    checkBtn(i + 1);
                    setCurrentPage(currentPage + 1);
                    break;
                }
            }

        }
        else {
            for (let i = 0; i < btnArr.length; i++) {
                const element = btnArr[i];
                if (element.classList.contains('repos-bottom-btn--active')) {
                    element.classList.remove('repos-bottom-btn--active');
                    checkBtn(ind - 1);
                    setCurrentPage(ind - 1)
                    break;
                }
            }
            btnArr[ind - 1].classList.add('repos-bottom-btn--active');
        }
    }

    return (
        <>
            <ul className='repos'>
                {repos
                    .slice(currentPage === totalPages - 1 ? (currentPage - 1) * reposPerPage : currentPage * reposPerPage, currentPage === totalPages - 1 ? (currentPage - 1) * reposPerPage + lastPageCount : currentPage * reposPerPage + reposPerPage)
                    .map((repo: Repo) => (
                        <li key={repo.id}><Card className={'repos__card'} image={repo.avatarUrl} captionSlot={repo.stargazers_count} dateSlot={repo.updated_at} title={repo.name} contentSlot={repo.description} /></li>
                    ))}

            </ul>

            <div className="repos-bottom-btns">
                <ArrowButton side='left' disabled={arwBtnDisL} onClick={() => btnChanger(6)}></ArrowButton>
                <ul className='repos-bottom-btns__btns-list'>
                    <BottomBtns amount={btnsCount} onClick={(index: number) => btnChanger(index)}></BottomBtns>
                </ul>
                <ArrowButton side='right' disabled={arwBtnDisR} onClick={() => btnChanger(7)}></ArrowButton>
            </div >
        </>
    );
}

export default Users;
