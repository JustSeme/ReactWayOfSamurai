import React, { } from 'react';
import PostFrom from './PostForm';
import { newPostActionCreator, onPostChangeActionCreator, onPostTitleChangeActionCreator } from '../../../redux/store';
import StoreContext from '../../../StoreContext';

const PostFormContainer = () => {
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

    return (
        <StoreContext.Consumer>
            {store => {
                const onChangePostTitle = (text) => {
                    store.dispatch(onPostTitleChangeActionCreator(text))
                }

                const onChangePostText = (text) => {
                    store.dispatch(onPostChangeActionCreator(text))
                }

                const onCreatePost = () => {
                    store.dispatch(newPostActionCreator())
                }

                return <PostFrom onChangePostTitle={onChangePostTitle} onChangePostText={onChangePostText} onCreatePost={onCreatePost} profilePage={store.getState().profilePage} />

            }}
        </StoreContext.Consumer>
    )
};

export default PostFormContainer;