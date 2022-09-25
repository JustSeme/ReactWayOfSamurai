import React from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from '../../UI/MyInput/MyInput';
import style from './PostForm.module.css';
import { Form, Field } from 'react-final-form'
import { maxLengthCreator } from '../../../utils/validators';
import MyTextarea from '../../UI/MyTextarea/MyTextarea';

const PostForm = ({ onCreatePost, profilePage, ...props }) => {

    const onSubmit = (formData) => {
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
                        <MyButton disabled={invalid}>Создать пост</MyButton>
                    </div>
                </form>
            )}
        >

        </Form >
    );
};

export default PostForm;