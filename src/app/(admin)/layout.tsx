import { NavBarAdmin } from "../components/NavBarAdmin";
import { SideBarAdmin } from "../components/SideBarAdmin";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <div className="flex">
            <div className="flex-[1] bg-green_admin p-5 min-h-screen">
                <SideBarAdmin/>
            </div>
            <div className="flex-[4] p-5">
                <NavBarAdmin/>
                {children}
            </div>
        </div>
    )
}