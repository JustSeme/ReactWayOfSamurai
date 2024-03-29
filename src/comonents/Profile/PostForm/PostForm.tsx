import React from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from '../../UI/MyInput/MyInput';
import style from './PostForm.module.css';
import { Form, Field } from 'react-final-form'
import { maxLengthCreator } from '../../../utils/validators';
import MyTextarea from '../../UI/MyTextarea/MyTextarea';
import { useTypedDispatch } from '../../../redux/redux-store';
import { newPostActionCreator } from '../../../redux/profileReducer';
import { Button } from 'antd';

const PostForm: React.FC = (props) => {
    const dispatch = useTypedDispatch()
    const onCreatePost = (newPostText: string, newPostTitleText: string) => dispatch(newPostActionCreator(newPostText, newPostTitleText))

    type FormDataType = {
        newPostTitleText: string
        newPostText: string
    }
    const onSubmit = (formData: FormDataType) => {
        onCreatePost(formData.newPostText, formData.newPostTitleText)
        formData.newPostText = ''
        formData.newPostTitleText = ''
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid }) => (
                <form className={style.newPost} onSubmit={handleSubmit}>
                    <Field
                        name='newPostTitleText'
                        render={({ input, meta }) => (
                            <MyInput
                                {...input}
                                size='middle'
                                placeholder='Ваше имя'
                            />
                        )}
                    />
                    <Field
                        validate={maxLengthCreator(50)}
                        name='newPostText'
                        component={MyTextarea}

                        cols="100" rows="4"
                        placeholder='Введите текст...'
                    />
                    <div>
                        <MyButton htmlType='submit' disabled={invalid} size='large' type='primary'>Создать пост</MyButton>
                    </div>
                </form>
            )}
        >

        </Form >
    );
};

export default PostForm;