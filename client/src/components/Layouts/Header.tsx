import { Link, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/features/themeConfigSlice';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconUser from '../Icon/IconUser';
import IconLogout from '../Icon/IconLogout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import toast from 'react-hot-toast';
import { setIsNotAuthenticated } from '../../store/features/authSlice';

const Header = () => {
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.auth.user);

    const isRtl = useAppSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useAppSelector((state) => state.themeConfig);
    const dispatch = useAppDispatch();


   

  

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 >ltr:-ml-1 rtl:-mr-1 inline" src="/logo192.png" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">Consul Services</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                </div>

                {/* horizontal menu */}
            </div>
        </header>
    );
};

export default Header;
