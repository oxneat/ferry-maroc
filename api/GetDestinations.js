import axios from 'axios';

export async function getIds() {
    let { data } = await axios.get('https://www.maroc-ferry.com/', {
        headers: {
            "Content-Type": "text/html",
            "Accept": "text/html"
        }
    })

    let result = [];

    let ff = data.substring(data.indexOf('<optgroup'), data.lastIndexOf('</optgroup>') + 11).split('</optgroup>')

    ff.forEach((e) => {
        let resArr1 = e.split('value=').map((ee, ind) => {
            let tmp = ee.substring(ee.indexOf(">"))

            return [ee.substring(1, ee.indexOf(">") - 2), tmp.substring(1, tmp.indexOf("<"))]

        })

        let resArr2 = e.split('data-compagnie=').map((ee, ind) => {
            return ee.substring(ee.indexOf('"') + 1, ee.indexOf('" dat'))

        })

        resArr1.splice(0, 1)

        resArr2.splice(0, 1)


        result .push({
            title: e.substring(e.indexOf('label=') + 7, e.indexOf('">')),
            data: resArr1,
            associations: resArr2
        })
    })

    return result
}