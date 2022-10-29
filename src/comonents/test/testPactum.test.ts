import pactum, { mock, settings } from 'pactum'

beforeEach(async () => {
    settings.setLogLevel('ERROR');

    await mock.start(9876);
})

afterEach(async () => {
    await mock.stop()
})

function addHelloWorldResponse() {
    mock.addInteraction({
        request: {
            method: 'GET',
            path: '/api/hello-world'
        },
        response: {
            status: 200,
            body: 'Hello, World!'
        }
    })
}

function addZipcodeResponse() {
    mock.addInteraction({
        request: {
            method: 'GET',
            path: '/api/zip',
            queryParams: {
                zipcode: 102030
            }
        },
        response: {
            status: 200,
            fixedDelay: 1000,
            body: {
                city: 'Moscow',
                zipcode: 102030,
            }
        }
    })
}

describe('Demonstration that Pactum APi mocking can', () => {
    test('return are basic REST response', async () => {
        addHelloWorldResponse()

        await pactum.spec()
            .get('http://localhost:9876/api/hello-world')
            .expectStatus(200)
            .expectBody('Hello, World!')
    })

    test('return are basic REST response with query params', async () => {
        addZipcodeResponse()

        await pactum.spec()
            .get('http://localhost:9876/api/zip?zipcode=102030')
            .expectStatus(200)
            .expectBody({
                city: 'Moscow',
                zipcode: 102030
            })
    })
})

