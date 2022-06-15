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
                                        onClick={toggleClass} to={'/'}> Главная
                                    </NavLink>
                                </li>
                                <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows">
                                    <Link to={'/'}> В наличии <FiChevronDown /></Link>
                                    <ul className={boxClassSubMenu.join(' ')}>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_metal_saez'}> Импортный металлопрокат (SAEZ)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_metal_import'}> Импортный металлопрокат (Прочие)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_metal_rus'}> Российский металлопрокат
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_plasma'}> Плазма
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_consumables'}> Расходные материалы
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_import_parts'}> Импортные комплектующие
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_electrics'}> Электрика
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_cabin_other'}> Детали для кабины
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/stock_hardware'}> Метизы
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows">
                                    <Link to={'/'}> Закупка <FiChevronDown /></Link>
                                    <ul className={boxClassSubMenu.join(' ')}>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_metal_saez'}> Импортный металлопрокат (SAEZ)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_metal_import'}> Импортный металлопрокат (Прочие)
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_metal_rus'}> Российский металлопрокат
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_plasma'}> Плазма
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_consumables'}> Расходные материалы
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_import_parts'}> Импортные комплектующие
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_electrics'}> Электрика
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_cabin_other'}> Детали для кабины
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={toggleClass}
                                                activeClassName='is-active'
                                                to={'/buy_hardware'}> Метизы
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className='menu-item '>
                                    <NavLink exact activeClassName='is-active'
                                        onClick={toggleClass} to={'/'}> Комплектующие
                                    </NavLink>
                                </li>
                                <li className='menu-item '>
                                    <NavLink exact activeClassName='is-active'
                                        onClick={toggleClass} to={'/leftovers'}> Остатки
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