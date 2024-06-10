import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <div className="">
            <SideBar/>
            <NavBar/>
            <div className="mb-8 mt-16 mr-14">
                {children}
            </div>
        </div>
    )
}