import { AuditIcon, Briefcase, Burger, DecisionIcon, FeesChargesIcon, FeesPricingIcon, Home, KarmaIcon, LoanRequestIcon, LoansIcon, OrganisationIcon, PreferencesIcon, ReportIcon, SavingsIcon, SavingsProductIcon, ServiceAccountIcon, ServicesIcon, SettlementsIcon, TransactionsIcon, UserFriends, Users, WhitelistIcon } from "../../ui/Svgs";
import SidebarCategory from "./SidebarCategory";
import styles from '../../../styles/Home.module.scss'
import SidebarItem from "./SidebarItem";
import { useState } from "react";

const Sidebar = () => {

    const [showSidebar, setShowSidebar] = useState(true)
    const handleShow = () => {
        setShowSidebar(!showSidebar)
    }

    const customerItems = [
        {
            icon: <UserFriends />,
            text: 'Users'
        },

        {
            icon: <Users />,
            text: 'Guarantors'
        },

    ]

    const businessesItems = [
        {
            icon: <OrganisationIcon />,
            text: 'Organization'
        },
        {
            icon: <LoanRequestIcon />,
            text: 'Loan Products'
        },

        {
            icon: <SavingsProductIcon />,
            text: 'Savings Products'
        },
        {
            icon: <FeesChargesIcon />,
            text: 'Fees and Charges'
        },
        {
            icon: <TransactionsIcon />,
            text: 'Transactions'
        },
        {
            icon: <ServicesIcon />,
            text: 'Services'
        },
        {
            icon: <ServiceAccountIcon />,
            text: 'Service Account'
        },
        {
            icon: <SettlementsIcon />,
            text: 'Settlements'
        },
        {
            icon: <ReportIcon />,
            text: 'Report'
        },

    ]

    const settingsItems = [
        {
            icon: <PreferencesIcon />,
            text: 'Preferences',
        },
        {
            icon: <FeesPricingIcon />,
            text: 'Fees and Pricing',
        },
        {
            icon: <AuditIcon />,
            text: 'Audit Logs',
        }
    ]

    return (
        <section className={styles.sidebar}>
            <div onClick={handleShow} className={styles.table_menu} style={{position: "fixed", background:"white", width: "50%", marginTop:"-1.3rem"}}>
                <Burger />
            </div>
          {showSidebar &&
          <div className={styles.sidebar__content}>
            <SidebarItem icon={<Briefcase />} text="switch organisatin" />
            <SidebarItem icon={<Home />} text="Dashboard" />
            <SidebarCategory category={customerItems} title={"customers"} />
            {/*<SidebarCategory category={businessesItems} title={"businesses"} />*/}
            {/*<SidebarCategory category={settingsItems} title={"Settings"} />*/}
          </div> 

        }
        </section>
    );
}

export default Sidebar;