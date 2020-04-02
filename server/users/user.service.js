const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin, division: 'администрация' },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, division: '7771' },
    { id: 3, username: 'user3', password: 'user3', firstName: 'THird', lastName: 'User', role: Role.User, division: 'fm777' },
    { id: 4, username: 'employee', password: 'employee', firstName: 'Employee', lastName: 'User', role: Role.Employee, division: 'fm777' },
    { id: 5, username: 'manager', password: 'manager', firstName: 'Manager', lastName: 'User', role: Role.Manager, division: 'fm777' }
];

module.exports = {
    authenticate,
    getAll,
    //getDivision,
    getById,
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// async function getDivision(division) {

//     const filtered = users.filter(user => user.division === 'fm777');
//     return filtered.map(u => {
//         const {
//             password,
//             ...userWithoutPassword
//         } = u;
//         return userWithoutPassword;
//     });
// }
