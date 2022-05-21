const {Pool} = require('pg')

const host = {
  host: 'localhost',
  database: '_test',
  user: 'postgres',
  password: '1',
  port: 5432
}
const devConfig = `postgresql://${host.user}:${host.password}@${host.host}:${host.port}/${host.database}`
// elephant db
const proConfig = process.env.DATABASE_URL

// const ssll = process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : false


const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig,
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