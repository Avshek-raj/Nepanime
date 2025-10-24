import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const AppLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen w-full justify-between">
                <div>
                    <Header />
                <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}