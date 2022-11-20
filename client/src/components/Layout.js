import { Outlet } from "react-router-dom"
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <main className="App">
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
            <Footer />

        </main>
    )
}

export default Layout