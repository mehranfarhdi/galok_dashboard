import Sidebar from "./layouts/sidebar/Sidebar";
import Navbar from "./layouts/Navbar";
import styles from '../styles/Home.module.scss';
import UserRecordCount from "./cards/UserRecordCount";
import { GroupProfileIcon, TwoProfilesIcon, DocumentIcon, DatabaseIcon } from "./ui/Svgs";
import UsersTable from "./sections/UsersTable";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUsersQuery } from "@/redux/services/users";
import { getLocalStorageItem } from "@/helpers/localStorage";
import UserManagementTable from "@/components/cards/UserManagementTable";
import CreateUserPage from "@/components/cards/CreateUserPage";

const Dashboard = () => {
    const { data } = useUsersQuery()
    const router = useRouter()
    const token = getLocalStorageItem('token');
    const userJson = getLocalStorageItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    useEffect(() => {
        if (!token) {
            router.push('/login',

                {
                    query: {
                        redirectTo: router.pathname

                    }
                })
        }

    }
        , [])

    const filteredArray = data
        ?.filter((item) => item.userStatus === 'active')

        const userWithLoans = data
        ?.filter((item) => item.hasLoan === true)

        const userWithSavings = data
        ?.filter((item) => item.hasSavings === true)

    const userRecords = [
        {
            icon: <TwoProfilesIcon />,
            text: "Users",
            values: `${data?.length}`,
            background: "#e018ff1c"

        },

    ]

    return (
        <>
            <section className={styles.dashboard}>
                <Navbar />
                <div className={styles.container_wrapper}>
                    <Sidebar />
                    <div className={styles.users} >
                        <h1 className={styles.users__title}>Users</h1>
                        <div className={styles.users__records}>
                            <CreateUserPage/>

                            {filteredArray && userRecords.map((record, index) => {
                                return (
                                    <UserRecordCount key={index} background={record.background} icon={record.icon} text={record.text} count={record.values} />
                                )
                            })}

                        </div>
                        <UserManagementTable/>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;