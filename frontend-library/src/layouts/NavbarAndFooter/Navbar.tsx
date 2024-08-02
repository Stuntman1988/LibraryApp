import {NavLink, useNavigate} from "react-router-dom"
import {useAuth} from "../../auth/AuthContext";


export const Navbar = () => {
    const {isAuth, logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/home')
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Love 2 Read</span>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
                        data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown'
                        aria-expanded='false' aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/home'}>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/search'}>Search Books</NavLink>
                        </li>
                        {isAuth &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/shelf'}>My Shelf</NavLink>
                            </li>
                        }
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            {isAuth ?
                                <button type='button' className='btn btn-outline-light' onClick={handleLogout}>Log
                                    out</button>
                                :
                                <a type='button' className='btn btn-outline-light' href='/login'>Sign in</a>
                            }

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

