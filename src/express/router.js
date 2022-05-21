const express = require('express')
const router = express.Router()
const XLSX = require('xlsx')
const fs = require('fs')
const {fetch} = require('../lib/pg')

const login = require('./routes/login.js')
const image = require('./routes/image.js')
const home = require('./routes/home.js')
const restorant = require('./routes/restorant-image')

// MED --- AVTO --- STARS
router.post('/check-code', login.CHECK_CODE)
router.post('/send-code', login.SEND_CODE)
router.post('/create-user', login.CREATE_USER)
router.post('/image', image.USER_IMG)
router.post('/user-service-image', image.USER_SERVICE_IMG)
router.post('/service-image', image.SERVICE_IMG)
router.post('/sub-service-image', image.SUB_SERVICE_IMG)

// RESTORANT

router.post('/restorant-service-img', restorant.RESTORANT_SERVICE_IMG)  // file + restorantServiceID
router.post('/restorant-food', restorant.RESTORANT_FOOD) // file + foodID
router.post('/check-img', restorant.TABLE_IMG_FOR_CHECK) // file + idForCheck

router.get('/services', home.SERVICES)
router.post('/sub-services', home.SUB_SERVICES)

router.post('/exel', (req, res) => {



    // var workbook = XLSX.readFile(__dirname + '/RestoranFixed.xlsx');
    // var sheet_name_list = workbook.SheetNames;
    // var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    // for (const i of xlData) {
    //     const obj = Object.keys(i)
    //     if (obj.includes('img')) {
            
    //         fs.unlink(__dirname + `/RESTORAN/${i.img}`, (err) => console.log(err))
    //     }
    // }
    res.send('exel')
})

router.post('/exel2', async (req, res) => {

    //var workbook = XLSX.readFile(__dirname + '/englsh.xlsx');
    //var workbook = XLSX.readFile(__dirname + '/kril.xlsx');
    //var workbook = XLSX.readFile(__dirname + '/main.xlsx');
    //var workbook = XLSX.readFile(__dirname + '/rus.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    const datt = {}
    for (const i of xlData) {
        const obj = Object.keys(i)
        if (obj.includes('B')) {
            
            if (!Object.keys(datt).includes(i.B)) {
                const data = await fetch(`SELECT id FROM sub_services WHERE name_uz = '${i.B}'`)
                datt[i.B] = data && data.id || false
            }
            
            if ('Kosmetolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
            } else if ('Allergolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Gastroenterolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Gematolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Ginekolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Dermatolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Kardiolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('LOR' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Nevropatolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Onkolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Oftalmolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Pediatr' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Jarroh' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Pulmanolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Revmatolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Reproduktolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Stomatolog' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            } else if ('Terapevt' === i.B) {
                fetch(`INSERT INTO med_keywords (keyword_med, sub_services_id) VALUES ('${i.A}', '${datt[i.B]}')`)
                // console.log(i.A, datt[i.B])
            }
        }

    }
    // console.log(datt)
    res.send('exel')
})

module.exports.router = router