import React from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from '../../UI/MyInput/MyInput';
import style from './PostForm.module.css';
import { Form, Field } from 'react-final-form'
import { composeValidators, maxLengthCreator, required } from '../../../utils/validators';
import MyTextarea from '../../UI/MyTextarea/MyTextarea';

const PostForm = ({ onCreatePost, profilePage, ...props }) => {
    /* const [title, setUsername] = useState('')
    const [body, setMessage] = useState('')
    const keyMessages = {
        'привет, вероника': `Привет, ${title}!`,
        'который час?': getTime(),
        'сколько будет': veronikaCalc(body) /* Калькулятор однозначных чисел 
    } */

    /* function veronikaCalc(string) {
        let arrayOfNumbers = []
        if (string.search(/\d/) != -1) {
            for (let i = 0; i < string.length; i++) {
                for (let j = 0; j < 10; j++) {
                    if (string[i] == j) arrayOfNumbers.push(string[i])
                }
            }
        }

        let result = 0
        arrayOfNumbers.forEach((number) => {
            result += Number(number)
        })

        return `Результат сложения ваших однозначных чисел равен ${result}`
    }

    function getTime() {
        let date = new Date
        return (`Сейчас ${date.getHours()}`)
    }

    function createPost(e) {
        dispatch()
    }

    useEffect(() => {
        for (let keyMessage in keyMessages) {
            if (body.toLocaleLowerCase().includes(keyMessage)) {
                const botMessage = {
                    id: Date.now(),
                    avatar: veronika,
                    title: 'Вероника',
                    body: keyMessages[keyMessage]
                }
                if (body.includes('сколько будет')) {
                    veronikaCalc(body)
                }
                setPost([...posts, botMessage])
            }
        }

        setUsername('')
        setMessage('')
    }, [posts]) */

    const onSubmit = (formData) => {
        onCreatePost(formData.newPostText, formData.newPostTitleText)
        formData.newPostText = ''
        formData.newPostTitleText = ''
    }

    const validate = (formData) => {
        const errors = {}

        if (!formData.newPostText)


            return errors
    }

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
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
                        validate={composeValidators(required, maxLengthCreator(50))}
                        name='newPostText'
                        component={MyTextarea}

                        className={style.textarea}
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