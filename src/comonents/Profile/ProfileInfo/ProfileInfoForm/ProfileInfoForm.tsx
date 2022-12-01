import React from 'react';
import { Form, Field } from 'react-final-form';
import MyInput from '../../../UI/MyInput/MyInput';
import MyButton from '../../../UI/MyButton/MyButton';
import MyTextarea from '../../../UI/MyTextarea/MyTextarea'
import styles from './ProfileInfoForm.module.css'
import { maxLengthCreator } from '../../../../utils/validators'
import { ProfileType } from '../../../../types/types';
import { useTypedDispatch } from '../../../../redux/redux-store';
import { updateProfileInfoThunkCreator } from '../../../../redux/profileReducer';

type PropsType = {
    profile: ProfileType
    onClose: () => void

}

const ProfileInfoForm: React.FC<PropsType> = ({ profile, onClose }) => {

    const dispatch = useTypedDispatch()
    const updateProfileInfo = (newProfileInfo: ProfileType) => dispatch(updateProfileInfoThunkCreator(newProfileInfo))

    const onSubmit = (formData: ProfileType) => {
        formData.userId = profile.userId

        updateProfileInfo(formData)
        onClose()
    }

    const initialObject = {
        aboutMe: profile.aboutMe,
        fullName: profile.fullName,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: {
            facebook: profile.contacts.facebook,
            website: profile.contacts.website,
            vk: profile.contacts.vk,
            twitter: profile.contacts.twitter,
            instagram: profile.contacts.instagram,
            youtube: profile.contacts.youtube,
            github: profile.contacts.github,
            mainLink: profile.contacts.mainLink
        }
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialObject}
            render={({ handleSubmit, invalid }) => (
                <form className={styles.formWrapper} onSubmit={handleSubmit}>
                    <Field
                        name='fullName'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Имя пользователя'
                            />
                        )}
                    />

                    <Field
                        name='contacts.github'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Ссылка на gitHub'
                            />
                        )}
                    />
                    <Field
                        name='contacts.vk'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Ссылка на VK'
                            />
                        )}
                    />
                    <Field
                        name='contacts.facebook'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Ссылка на Facebook'
                            />
                        )}
                    />
                    <Field
                        name='contacts.instagram'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Ссылка на Instagram'
                            />
                        )}
                    />
                    <Field
                        name='contacts.twitter'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Ссылка на Twitter'
                            />
                        )}
                    />
                    <Field
                        name='contacts.website'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Ссылка на веб-сайт'
                            />
                        )}
                    />
                    <Field
                        name='contacts.youtube'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Ссылка на Youtube'
                            />
                        )}
                    />
                    <Field
                        name='contacts.mainLink'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                placeholder='Основная ссылка'
                            />
                        )}
                    />
                    <Field
                        validate={maxLengthCreator(70)}
                        name='aboutMe'
                        render={({ input, meta }) => (
                            <MyTextarea
                                input={input}
                                meta={meta}
                                cols="50" rows="2"
                                placeholder='Обо мне'
                            />
                        )}
                    />
                    <Field
                        validate={maxLengthCreator(70)}
                        name='lookingForAJobDescription'
                        render={({ input, meta }) => (
                            <MyTextarea
                                input={input}
                                meta={meta}
                                cols="50" rows="2"
                                placeholder='Описание своих рабочих навыков'
                            />
                        )}
                    />
                    <Field
                        name='lookingForAJob'
                        type='checkbox'
                        render={({ input, meta }) => (
                            <div style={{ marginBottom: '5px' }}>
                                <input {...input} />Ищу работу
                            </div>
                        )}
                    />
                    <div>
                        <MyButton htmlType='submit' type='primary' disabled={invalid}>Сохранить</MyButton>
                    </div>
                </form>
            )}
        >

        </Form >
    );
};

export default ProfileInfoForm;