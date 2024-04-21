import * as authRepository from '../repository/authRepository.js';

async function checkPassword(name, password) {
    try {
        const user = await authRepository.getUserByNameFromDB(name);
        const match = await authRepository.checkPasswordInDB(user, password);
        return match;
    } catch (err) {
        console.error('Error checking user password', err);
        throw err;
    }
}

export default { checkPassword };
