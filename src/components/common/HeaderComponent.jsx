import React, { Component, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiAlignRight, FiXCircle, FiChevronDown } from 'react-icons/fi'
import logo from './logo.png';

const HeaderComponent = () => {

    const [isMenu, setIsMenu] = useState(false);
    const [isResponsiveClose, setResponsiveClose] = useState(false);
    const toggleClass = () => {
        setIsMenu(isMenu === false ? true : false);
        setResponsiveClose(isResponsiveClose === false ? true : false);
    };

    let boxClass = ['main-menu menu-right menuq1'];

    if (isMenu) {
        boxClass.push('menuq2');
    } else {
        boxClass.push(' ');
    }

    const [isMenuSubMenu, setMenuSubMenu] = useState(false);

    const toggleSubmenu = () => {
        setMenuSubMenu(isMenuSubMenu === false ? true : false);
    };

    let boxClassSubMenu = ["sub__menus"];

    if (isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    } else {
        boxClassSubMenu.push('');
    }

    return (
        <header className='header__middle'>
            <div className='container'>
                <div className='row'>
                    {/* <div className='header__middle__logo'>
                        <NavLink exact activeClassName='is-active' to={'/'}>
                            <img src={logo} alt='logo' />
                        </NavLink>
                    </div> */}

                    <div className='header__middle__menus'>
                        <nav className='main-nav '>

                            {isResponsiveClose === true ? <>
                                <span className='menubar__button' style={{
                                    display:
                                        'none'
                                }} onClick={toggleClass}><FiXCircle /></span>
                            </> : <>
                                <span className='menubar__button' style={{
                                    display:
                                        "none"
                                }} onClick={toggleClass}><FiAlignRight /></
                                span>
                            </>}

                            <ul className={boxClass.join(' ')}>
                                <li>
                                    {/* <img src={logo} width="100px" /> */}
                                    <NavLink exact activeClassName='is-active'
                                        onClick={toggleClass} to={'/'}> <img src={logo} width="100px" />
                                    </NavLink>
                                </li>
                                <li className='menu-item'>
                                    <NavLink exact activeClassName='is-active'
                                        onClick={toggleClass} to={'/'}> ??????????????
                                    </NavLink>
                                </li>
                                <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows">
                                    <Link to={'/'}> ?? ?????????????? <FiChevronDown /></Link>
                                    <ul className={boxClassSubMenu.join(' ')}>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_metal_saez'}> ?????????????????? ?????????????????????????? (SAEZ)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_metal_import'}> ?????????????????? ?????????????????????????? (????????????)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_metal_rus'}> ???????????????????? ??????????????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_plasma'}> ????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_consumables'}> ?????????????????? ??????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_import_parts'}> ?????????????????? ??????????????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_electrics'}> ??????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_cabin_other'}> ???????????? ?????? ????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_hardware'}> ????????????
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows">
                                    <Link to={'/'}> ?????????????? <FiChevronDown /></Link>
                                    <ul className={boxClassSubMenu.join(' ')}>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_metal_saez'}> ?????????????????? ?????????????????????????? (SAEZ)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_metal_import'}> ?????????????????? ?????????????????????????? (????????????)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_metal_rus'}> ???????????????????? ??????????????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_plasma'}> ????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_consumables'}> ?????????????????? ??????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_import_parts'}> ?????????????????? ??????????????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_electrics'}> ??????????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_cabin_other'}> ???????????? ?????? ????????????
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_hardware'}> ????????????
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className='menu-item '>
                                    <NavLink exact activeClassName='is-active'
                                        onClick={toggleClass} to={'/'}> ??????????????????????????
                                    </NavLink>
                                </li>
                                <li className='menu-item '>
                                    <NavLink exact activeClassName='is-active'
                                        onClick={toggleClass} to={'/leftovers'}> ??????????????
                                    </NavLink>
                                </li>

                            </ul>
                        </nav>

                    </div>

                </div>
            </div >
        </header >
    );
}


export default HeaderComponent;