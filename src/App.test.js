import SamuraiJSApp from "./App"
import ReactDOM from 'react-dom/client'

it('renders without crashing', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div);
    root.render(
        <SamuraiJSApp />
    );
})