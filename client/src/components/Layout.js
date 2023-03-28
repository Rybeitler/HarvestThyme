import Nav  from './Nav';
import { Outlet } from 'react-router-dom'
import Footer from './Footer';
import SecondaryNav from './SecondaryNav';

const Layout = () => {
    return (
        <main className='App'>
            <Nav/>
            <SecondaryNav/>
            <Outlet/>
            <Footer/>
        </main>
    );
}

export default Layout;
