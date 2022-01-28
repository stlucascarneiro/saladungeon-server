import { UserMiddlewares } from "../../src/middlewares/UserMiddlewares"

export async function dataUsers() {
    return {
        data: [
            {
                username: 'Froubt64',
                email: 'froubt64@mail.com',
                password: await UserMiddlewares.generateHashPassword('froubt64'),
                about: 'Um texto sobre o perfil de Froubt64',
                contact: 'Informações de contato'
            },
            {
                username: 'Retharts',
                email: 'retharts@mail.com',
                password: await UserMiddlewares.generateHashPassword('retharts'),
                about: 'Um texto sobre o perfil de Retharts',
                contact: 'Informações de contato'
            },
            {
                username: 'Deeng014',
                email: 'deeng014@mail.com',
                password: await UserMiddlewares.generateHashPassword('deeng014'),
                about: 'Um texto sobre o perfil de Deeng014',
                contact: 'Informações de contato'
            },
            {
                username: 'Ottelf',
                email: 'ottelf@mail.com',
                password: await UserMiddlewares.generateHashPassword('ottelf'),
                about: 'Um texto sobre o perfil de Ottelf',
                contact: 'Informações de contato'
            },
        ]
    }
}