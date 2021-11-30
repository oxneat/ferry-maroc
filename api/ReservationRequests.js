import axios from "axios";

export async function getTravRet(id) {

    // console.log("-----------------------------------------------------------")
    // console.log(id)
    let resp_o = await axios.get(`https://www.maroc-ferry.com/trouverretours?traversee=${id}`);
    // console.log('-----------------------------------------------------------------------')
    // console.log(resp_o.data)
    let resp_t = await axios.get(`https://www.maroc-ferry.com/datesdisponibilite?traversee=${id}&traverseeRet=${resp_o.data[Object.keys(resp_o.data)[0]][0]["Ports"]}`);
    // console.log('-----------------------------------------------------------------------')
    // console.log(resp_t.data)
    let resp_th = await axios.get(`https://www.maroc-ferry.com/chargervehicule?param=${id}`);
    // console.log('-----------------------------------------------------------------------')
    // console.log(resp_th.data)
    let resp_fo = await axios.get(`https://www.maroc-ferry.com/ageTraverse?param=${id}`);
    // console.log('-----------------------------------------------------------------------')
    // console.log(resp_fo.data)
    // console.log('-----------------------------------------------------------------------')

    return {
        dates: resp_t.data,
        vehicles: resp_th.data,
        ageConstraints: resp_fo.data
    }
    // return data;
}