import React, { useEffect, useState } from 'react';
import MyButton from "../UI/button/MyButton";
import MyInput from '../UI/MyInput/MyInput';
import style from './PostForm.module.css'
import veronika from '../../img/avatar.png'

const PostFrom = ({ setPost, posts, ...props }) => {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const keyMessages = {
        'привет, вероника': `Привет, ${username}!`,
        'который час?': getTime(),
        'сколько будет': veronikaCalc(message) /* Калькулятор однозначных чисел */
    }

    function veronikaCalc(string) {
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
        const newPost = {
            id: Date.now(),
            username,
            message
        }
        setPost([...posts, newPost])
    }

    useEffect(() => {
        for (let keyMessage in keyMessages) {
            if (message.toLocaleLowerCase().includes(keyMessage)) {
                const botMessage = {
                    id: Date.now(),
                    avatar: veronika,
                    username: 'Вероника',
                    message: keyMessages[keyMessage]
                }
                if (message.includes('сколько будет')) {
                    veronikaCalc(message)
                }
                setPost([...posts, botMessage])
            }
        }

        setUsername('')
        setMessage('')
    }, [posts])

    return (
        <div className={style.newPost}>
            <MyInput
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='Ваше имя'
            />
            <textarea className={style.textarea} value={message} placeholder="Новый пост" cols="100" rows="4" onChange={e => setMessage(e.target.value)} />
            <div>
                <MyButton onClick={e => createPost(e)} type='submit'>Создать пост</MyButton>
            </div>
        </div>
    );
};

export default PostFrom;