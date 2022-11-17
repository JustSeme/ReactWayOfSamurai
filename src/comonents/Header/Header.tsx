import style from './Header.module.css'
import logo from '../../img/logo.svg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType, useTypedDispatch } from '../../redux/redux-store';
import { logoutActionCreator } from '../../redux/authReducer';
import { Header } from 'antd/lib/layout/layout';
import { Avatar, Button, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import { selectCurrentUserLogin, selectIsAuth, selectUserPhoto,  } from '../../redux/selectors/authSelectors';
import { getAuthPhotoThunkCreator } from '../../redux/profileReducer';

type PropsType = {
    collapsed: boolean
    setCollapsed: (val: boolean) => void
}

export const AppHeader: React.FC<PropsType> = ({ collapsed, setCollapsed }) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const userId = useSelector((state: AppStateType) => state.auth.userId)
    const dispatch = useTypedDispatch()
    
    useEffect(() => {
        if(userId) dispatch(getAuthPhotoThunkCreator(userId))
    }, [userId, dispatch])

    const userPhoto = useSelector(selectUserPhoto)
    
    const logout = () => dispatch(logoutActionCreator())

    return (
            <Header className="site-layout-background" style={{ padding: 0, height: 52.5 }}>
                <Row>
                    <Col span={2}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger menuTrigger',
                        onClick: () => setCollapsed(!collapsed),
                        })}
                    </Col>
                        {isAuth
                            ?
                            <div style={{display: 'flex', marginLeft: 'auto', marginRight: 20}}>
                                <Avatar
                                    src={userPhoto}
                                    shape='square'
                                    alt={login ? login : undefined}
                                    style={{marginTop: 10}}
                                />
                                <Button
                                    style={{marginLeft: 10, marginTop: 18}}
                                    size='small'
                                    type='primary'
                                    onClick={logout}
                                >Logout</Button>
                                <p className={style.loginInfo}>{login}</p>
                            </div>
                            :
                            <Button
                                style={{marginLeft: 'auto', marginRight: 20, marginTop: 10}}
                                type='primary'
                            >
                                <Link to='/login'>Login</Link>
                            </Button>
                        }
                </Row>
            </Header>
        )/* (
        <header className={style.header}>
            <img src={logo} alt='logo'></img>

            <div className={style.loginBlock}>
                {isAuth
                    ?
                    <span style={{ 'display': 'flex' }}>
                        <p className={style.userLogin}>{login}</p>
                        <MyButton
                            onClick={logout}
                            style={{ 'fontSize': '14px', 'padding': '0px 5px', 'maxHeight': '30px' }}
                        >Logout</MyButton>
                    </span>
                    :
                    <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    ) */
}