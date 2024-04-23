import { fetchRepos } from "./routes";
let data: any = null

const handleClick = async () => {
    let input = document.getElementById('searchInput') as HTMLInputElement | null;
    const val = input?.value;
    data = await fetchRepos(val)
    console.log(data);
}

export { handleClick, data }