import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import MyInput from '../../../UI/MyInput/MyInput';
import MyButton from '../../../UI/MyButton/MyButton';
import MyTextarea from '../../../UI/MyTextarea/MyTextarea'
import styles from './ProfileInfoForm.module.css'
import { maxLengthCreator } from '../../../../utils/validators'

const ProfileInfoForm = ({ profile, updateProfileInfo }) => {
    console.log(profile);
    const [username, setUsername] = useState(profile.fullName)
    const [lookingForAJobDescription, setlookingForAJobDescription] = useState(profile.lookingForAJobDescription)
    const [aboutMe, setAboutMe] = useState(profile.aboutMe)
    const [gitHubLink, setGitHubLink] = useState(profile.contacts.gitHub)
    const [vkLink, setVkLink] = useState(profile.contacts.vk)
    const [facebookLink, setFacebookLink] = useState(profile.contacts.facebook)
    const [instagramLink, setInstagramLink] = useState(profile.contacts.instagram)
    const [twitterLink, setTwitterLink] = useState(profile.contacts.twitter)
    const [websiteLink, setWebsiteLink] = useState(profile.contacts.website)
    const [youtubeLink, setYoutubeLink] = useState(profile.contacts.youtube)
    const [mainLink, setMainLink] = useState(profile.contacts.mainLink)

    const onSubmit = (formData) => {
        formData.userId = profile.userId
        formData.lookingForAJobDescription = lookingForAJobDescription ? lookingForAJobDescription : ''
        formData.fullName = username ? username : ''
        formData.aboutMe = aboutMe ? aboutMe : ''
        formData.contacts = {}
        formData.contacts.github = gitHubLink ? gitHubLink : ''
        formData.contacts.vk = vkLink ? vkLink : ''
        formData.contacts.facebook = facebookLink ? facebookLink : ''
        formData.contacts.instagram = instagramLink ? instagramLink : ''
        formData.contacts.twitter = twitterLink ? twitterLink : ''
        formData.contacts.website = websiteLink ? websiteLink : ''
        formData.contacts.youtube = youtubeLink ? youtubeLink : ''
        formData.contacts.mainLink = mainLink ? mainLink : ''

        updateProfileInfo(formData)
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid }) => (
                <form className={styles.formWrapper} onSubmit={handleSubmit}>
                    <Field
                        name='fullName'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Имя пользователя'
                            />
                        )}
                    />

                    <Field
                        name='github'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={gitHubLink}
                                onChange={(e) => setGitHubLink(e.target.value)}
                                placeholder='Ссылка на gitHub'
                            />
                        )}
                    />
                    <Field
                        name='vk'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={vkLink}
                                onChange={(e) => setVkLink(e.target.value)}
                                placeholder='Ссылка на VK'
                            />
                        )}
                    />
                    <Field
                        name='facebook'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={facebookLink}
                                onChange={(e) => setFacebookLink(e.target.value)}
                                placeholder='Ссылка на Facebook'
                            />
                        )}
                    />
                    <Field
                        name='instagram'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={instagramLink}
                                onChange={(e) => setInstagramLink(e.target.value)}
                                placeholder='Ссылка на Instagram'
                            />
                        )}
                    />
                    <Field
                        name='twitter'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={twitterLink}
                                onChange={(e) => setTwitterLink(e.target.value)}
                                placeholder='Ссылка на Twitter'
                            />
                        )}
                    />
                    <Field
                        name='website'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={websiteLink}
                                onChange={(e) => setWebsiteLink(e.target.value)}
                                placeholder='Ссылка на веб-сайт'
                            />
                        )}
                    />
                    <Field
                        name='youtube'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                placeholder='Ссылка на Youtube'
                            />
                        )}
                    />
                    <Field
                        name='mainLink'
                        render={({ input, meta }) => (
                            <MyInput
                                input={input}
                                meta={meta}
                                value={mainLink}
                                onChange={(e) => setMainLink(e.target.value)}
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
                                value={lookingForAJobDescription}
                                onChange={(e) => setlookingForAJobDescription(e.target.value)}
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
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                cols="50" rows="2"
                                placeholder='Описание своих рабочих потребностей'
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
                        <MyButton disabled={invalid}>Создать пост</MyButton>
                    </div>
                </form>
            )}
        >

        </Form >
    );
};

export default ProfileInfoForm;