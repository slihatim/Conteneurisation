import { Outlet } from "react-router-dom";

const SharedLayout = () => {
    return (
        <main className="shared-layout">
            <Outlet />
        </main>
    )
}

export default SharedLayout;