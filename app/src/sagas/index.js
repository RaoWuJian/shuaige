import {  put, takeEvery } from 'redux-saga/effects'

function* myfetch(){
    let res = yield fetch('http://localhost:3080/')
    let res1 = yield res.json()
    yield put({type:'fetch',payload:res1})

}
//添加
function* increase(obj){
    let value = obj.value;
    yield fetch('http://localhost:3080/increase',{
            method : 'POST',
            body: JSON.stringify(value),
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }).catch((r) => {
            console.log(r);
        });

  
    let res = yield fetch('http://localhost:3080')
    let res1 = yield res.json()
    yield put({type:'reset',payload:res1})

}


//删除
function* mydelete(obj){
    let id = obj.id;
    yield fetch('http://localhost:3080/delete',{
        method : 'POST',
        body: JSON.stringify(id),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }).catch((r) => {
        console.log(r);
    });
    let res = yield fetch('http://localhost:3080/')
    let res1 = yield res.json()
    yield put({type:'delete',payload:res1})
}

//搜索
function* modify(obj){
    let value = obj.value
    let res = yield fetch('http://localhost:3080/search',{
        method : 'POST',
        body: JSON.stringify(value),
    })
    let res1 = yield res.json()
    yield put({type:'searcha',payload:res1})

}

//重置
function* reset(){
    let res = yield fetch('http://localhost:3080/')
    let res1 = yield res.json()
    yield put({type:'fetch',payload:res1})

}
//修改
function* save(obj){
    let data= obj.value;
    let res= yield fetch('http://localhost:3080/modify',{
            method : 'POST',
            body: JSON.stringify(data),

        })
    let res1= yield res.json();
    yield put({type:'saves',payload:res1})

}


function* mySaga() {
    yield takeEvery("fe", myfetch );
    yield takeEvery("in", increase );
    yield takeEvery("de", mydelete );
    yield takeEvery("mo", modify );
    yield takeEvery("re", reset );
    yield takeEvery("sa", save );
  }
  
export default mySaga;