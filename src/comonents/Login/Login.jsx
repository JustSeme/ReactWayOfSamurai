import React from 'react';
import MyInput from '../UI/MyInput/MyInput'
import style from '../UI/MyInput/MyInput.module.css'
import MyButton from '../UI/MyButton/MyButton'
import { required } from '../../utils/validators'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const Login = ({ login, isAuth, isCaptcha, ...props }) => {

    if (isAuth)
        return <Navigate to='/profile' />

    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={login} isCaptcha={isCaptcha} />
        </div>
    );
};

const LoginForm = ({ login, isCaptcha, ...props }) => {

    const onSubmit = async (formData) => {
        return await login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitError }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name='email'
                        component={MyInput}
                        validate={required}

                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={MyInput}
                        validate={required}

                        type='password'
                        placeholder='Password'
                    />
                    <Field
                        name='rememberMe'
                        type={'checkbox'}
                        render={({ input, meta }) => (
                            <div style={{ marginBottom: '5px' }}>
                                <input {...input} />remember me
                            </div>
                        )}
                    />
                    <div id='captcha'></div>
                    {isCaptcha ?
                        <Field
                            name='captcha'
                            component={MyInput}

                            placeholder='Captcha'
                        />
                        : ''
                    }
                    {submitError ?
                        <div className={style.formSummaryError}>
                            {submitError}
                        </div> : ''}
                    <div>
                        <MyButton>Login</MyButton>
                    </div>
                </form>
            )}
        >
        </Form>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isCaptcha: state.auth.isCaptcha,
})

export default connect(mapStateToProps, { login })(Login);