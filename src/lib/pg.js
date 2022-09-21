const {Pool} = require('pg')

const devConfig = 'postgres://mrdyvmxx:7CG9dg-_fiB1krq3Ts9TRsH8_sm9S0Oy@jelani.db.elephantsql.com/mrdyvmxx'
// elephant db
const proConfig = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: devConfig,
  ssl: false
})


const fetch = async (SQL, ...params) => {
	const client = await pool.connect()
	try {
		const { rows: [row] } = await client.query(SQL, params.length ? params : null)
		return row
	}
	finally {
		client.release()
	}
}

const fetchAll = async (SQL, ...params) => {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(SQL, params.length ? params : null)
		return rows
	}
	finally {
		client.release()
	}
}

module.exports = {
	fetch, fetchAll
}