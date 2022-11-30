import React, { useState } from 'react';
import style from './Login.module.css'
import errorStyle from '../UI/MyInput/MyInput.module.css'
import { required } from '../../utils/validators'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { LoginThunkType } from '../../types/types';
import InfoBlock from './InfoBlock/InfoBlock';
import infoCircle from '../../img/icons/infoCircle.svg'
import { createForm } from 'final-form';
import { Button } from 'antd';

type LoginPropsType = {
    login: LoginThunkType
    isAuth: boolean
    isCaptcha: boolean
}

const Login: React.FC<LoginPropsType> = ({ login, isAuth, isCaptcha }) => {

    if (isAuth)
        return <Navigate to='/profile' />

    return (
        <div>
            <h1>Log In</h1>
            <div className={style.wrapper}>
                <LoginForm login={login} isCaptcha={isCaptcha} />
            </div>
        </div>
    );
};

type LoginFormType = {
    login: LoginThunkType
    isCaptcha: boolean
}

const LoginForm = ({ login, isCaptcha }: LoginFormType) => {
    const [isShowInfo, setShowInfo] = useState(false)

    type FormDataType = {
        email: string
        password: string
        rememberMe: boolean
        captcha: boolean | undefined
    }
    const onSubmit = (formData: FormDataType) => {
        return login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    
    const form = createForm({onSubmit})

    const pasteLoginData = () => {
        form.batch(() => {
            form.change('email', 'semyn03@mail.ru')
            form.change('password', 'QWERTY123')
        })
    }

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
            render={({ handleSubmit, submitError }) => (
                <form className={style.signIn} onSubmit={handleSubmit}>
                    <Field
                        name='email'
                        component={'input'}
                        validate={required}
                        type='text'

                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={'input'}
                        validate={required}

                        type='password'
                        placeholder='Password'
                    />
                    <Field
                        name='rememberMe'
                        type={'checkbox'}
                        component={'input'}
                    /> Запомнить меня
                    <div id='captcha'></div>
                    {isCaptcha ?
                        <Field
                            name='captcha'
                            component={'input'}

                            placeholder='Captcha'
                        />
                        : ''
                    }
                    {submitError ?
                        <div className={errorStyle.formSummaryError}>
                            {submitError}
                        </div> : ''}
                    <div className={style.btnsWrapper}>
                        <button type='submit'>▶</button>
                    </div>
                    <p>Don't you have an account? <a href="https://social-network.samuraijs.com/signUp">зарегистрироваться</a></p>
                    <InfoBlock visible={isShowInfo} />
                    <div style={{display: 'flex'}}>
                        <Button onClick={pasteLoginData}>Использовать тестовые данные</Button>
                        <img src={infoCircle} alt="info" onMouseOver={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)} />
                    </div>
                </form>
            )}
        >
        </Form>
    );
};

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    isCaptcha: state.auth.isCaptcha,
})

export default connect(mapStateToProps, { login })(Login);