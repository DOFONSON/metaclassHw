import Header from "../../../components/Header/Header"
import AuthForm from "./components/AuthForm/AuthForm"
import { ClientProfileStore } from "../../../store/ClientProfileStore/ClientProfileStore";
import { useLocalObservable } from "mobx-react-lite";
import { ClientProfileStoreProvider } from "../../../store/ClientProfileStore/ClientProfileStoreProvider";
const UserPage = () => {
    const cliStore = useLocalObservable(() => new ClientProfileStore());
    return (
        <>
            <Header />
            <ClientProfileStoreProvider value={cliStore}>
                <AuthForm cliStore={cliStore} />
            </ClientProfileStoreProvider>
        </>
    )
}

export default UserPage