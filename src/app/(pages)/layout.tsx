'use client'
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { SidebarProvider } from "../utils/context";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <div className="">
            <SidebarProvider>
                <SideBar/>
                <NavBar/>
            </SidebarProvider>
            <div className="mb-8 mt-16 lg:mr-14 mx-4">
                {children}
            </div>
        </div>
    )
}