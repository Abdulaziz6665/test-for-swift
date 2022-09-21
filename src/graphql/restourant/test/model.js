const {fetch, fetchAll} = require('../../../lib/pg.js');

const get_food = `
    select * from foods
`

const add_food = `
    insert into foods (name, price) values ($1, $2) returning *
`

const food_by_id = `
    select * from foods where id = $1
`

const update_img = `
    update foods set img = $1 where id = $2 returning *
`

const delete_food_by_id = `
    delete from foods where id = $1 returning *
`


const deleteFoodByID = (id) => fetch(delete_food_by_id, id)
const getFoods = () => fetchAll(get_food);
const addFood = (name, price) => fetch(add_food, name, price);
const foodByID = (id) => fetch(food_by_id,id);
const updateFoodImg = (img, id) => fetch(update_img, img, id);


module.exports = {
    getFoods,
    addFood,
    updateFoodImg,
    foodByID,
    deleteFoodByID
}
