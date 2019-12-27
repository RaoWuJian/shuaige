import { put, takeEvery ,call } from 'redux-saga/effects';
import Fecth from './fecth.js'
import {INCREASE, DELETE, SEARCH, MODIFY, REQUEST} from './fetchType'

//首次查询
function* myfetch(){
    let res =yield Fecth.getReq(REQUEST)
    yield put({type:'fetch',payload:res})

}
//添加
function* increase(obj){
    let v = obj.values;
    yield Fecth.postReq(INCREASE,v);
    let res=yield call(Fecth.getReq,REQUEST);
    yield put({type:'reset',payload:res})
}

//删除
function* mydelete(obj){
    let v = obj.id;
    yield Fecth.postReq(DELETE,v);
    let res=yield Fecth.getReq(REQUEST);
    yield put({type:'delete',payload:res})
}

//搜索
function* modify(obj){
    let v = obj.value;
    let res=yield Fecth.search(SEARCH,v);
    yield put({type:'searcha',payload:res})
}

//重置
function* reset(){
    let res=yield Fecth.getReq(REQUEST);
    yield put({type:'fetch',payload:res})
}

//修改
function* save(obj){
    let v= obj.value;
    yield Fecth.postReq(MODIFY,v);
    let res=yield Fecth.getReq(REQUEST);
    yield put({type:'saves',payload:res})
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