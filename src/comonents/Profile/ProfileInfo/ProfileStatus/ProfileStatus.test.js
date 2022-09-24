import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('profile status component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'Hello World'} />)
        const instanse = component.getInstance()
        expect(instanse.state.statusText).toBe('Hello World')
    })

    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus />)
        const root = component.root
        const span = root.findByType('span')
        expect(span.type === 'span').toBe(true)
    })

    test('after creation input shouldn`t be displayed', () => {
        const component = create(<ProfileStatus />)
        const root = component.root
        expect(() => {
            const input = root.findByType('input')
        }).toThrow()
    })

    test('after creation span should be displayed and contain correct status', () => {
        const component = create(<ProfileStatus status={'Hello World'} />)
        const root = component.root
        const span = root.findByType('span')
        expect(span.children[0]).toBe('Hello World')
    })

    test('edit mode should be changed', () => {
        const component = create(<ProfileStatus status={'Hello World'} />)
        const instanse = component.getInstance()
        const root = component.root
        const span = root.findByType('span')
        span.props.onClick()
        expect(instanse.state.editMode).toBe(true)
    })

    test('input should be displayed instead of span', () => {
        const component = create(<ProfileStatus status={'Hello World'} />)
        const instanse = component.getInstance()
        const root = component.root
        const span = root.findByType('span')
        span.props.onClick()
        const input = root.findByType('input')
        expect(input.props.value).toBe('Hello World')
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'Hello World'} updateStatus={mockCallback} />)
        const instanse = component.getInstance()
        instanse.deActivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})