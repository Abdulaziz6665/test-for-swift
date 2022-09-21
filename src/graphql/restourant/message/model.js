const {fetch, fetchAll} = require('../../../lib/pg.js');


const MESSAGES = `
    SELECT
        m.id as message_id,
        m.message,
        u.id as user_id,
        u.name
    FROM messages as m
    JOIN users as u ON u.id = m.user_id
`

const ADD_USER = `
    INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *
`

const CHECK_USER = `
    SELECT * FROM users WHERE name = $1 AND password = $2
`

const CREATE_MESSAGE = `
    INSERT INTO messages (message, user_id) VALUES ($1, $2) RETURNING id
`

const SELECT_MESSAGE_BY_ID = `
    SELECT
        m.id as message_id,
        m.message,
        u.id as user_id,
        u.name
    FROM messages as m
    JOIN users as u ON u.id = m.user_id
    WHERE m.id = $1
`

const DEVICE_IDS = `
    SELECT
        (SELECT name FROM users WHERE id = $1) as name
    FROM users WHERE id != $1
    group by name
`

const delete_message_by_id = `
    delete from messages where id = $1 returning *
`

const delete_user_by_id = `
    delete from users where id = $1 returning *
`

const deleteMessageById = (id) => fetch(delete_message_by_id, id)
const deleteUserByID = (id) => fetch(delete_user_by_id, id)
const deviceIDs = (userID) => fetch(DEVICE_IDS, userID)
const messages = () => fetchAll(MESSAGES);
const signUp = (name, password) => fetch(ADD_USER, name, password)
const login = (name, password) => fetch(CHECK_USER, name, password)
const createMessage = (message, userID) => fetch(CREATE_MESSAGE, message, userID)
const messageByID = (id) => fetch(SELECT_MESSAGE_BY_ID, id)

module.exports = {
    messages,
    signUp,
    login,
    createMessage,
    messageByID,
    deviceIDs,
    deleteMessageById,
    deleteUserByID,
}
