import React from 'react';
import MyInput from '../UI/MyInput/MyInput'
import MyButton from '../UI/MyButton/MyButton'
import { required } from '../../utils/validators'
import { Form, Field } from 'react-final-form'

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
};

const LoginForm = () => {

    const onSubmit = (e) => {
        debugger
    }

    const validate = (e) => {
        const errors = {}

        if (!e.login) {
            errors.login = 'Too short...'
        }

        if (!e.password) {
            errors.password = 'Too short...'
        }

        return errors
    }
    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name='login'
                        component={MyInput}
                        validate={required}

                        placeholder='Login'
                    />
                    <Field
                        name='password'
                        component={MyInput}
                        validate={required}

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
                    <div>
                        <MyButton>Login</MyButton>
                    </div>
                </form>
            )}
        >

        </Form>
    );
};

export default Login;