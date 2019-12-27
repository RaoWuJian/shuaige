import {HEADERS} from './fetchType'

let Fecth={
    //查询方法
    getReq: function*(v){
        let res= yield fetch(v,{
            headers:HEADERS
        }).catch((r) => {
            console.log(r);
        });
        let res1= yield res.json();
        return res1;
    },

    //往数据库添加数据方法
    postReq: function*(v,r){
        yield fetch(v,{
            method : 'POST',
            body: JSON.stringify(r),
            headers: HEADERS
        }).catch((r) => {
            console.log(r);
        });
    },

    //查询方法
    search: function*(v,r){
        let res= yield fetch(v,{
            method : 'POST',
            body: JSON.stringify(r),
            headers: HEADERS
        }).catch((r) => {
            console.log(r);
        });
        let res1= yield res.json();
        return res1;
    }
}
export default Fecth;