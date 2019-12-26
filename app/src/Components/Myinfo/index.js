import React,{Component} from 'react';
import {connect} from 'react-redux'
import { Input,Button, Modal } from 'antd';
const { TextArea } = Input;
const { confirm } = Modal;


let mapStateToProps = (state) =>{
  return {
    todoListReducer: state.todoListReducer
  }
}

@connect(mapStateToProps)
class MyInfo extends Component{
  constructor(props) {
    super(props);
    this.state={
      name: '',
      type: '',
      content: '',
    }

    this.setUsername = this.setUsername.bind(this)
    this.setUsertype = this.setUsertype.bind(this)
    this.setUsercontent = this.setUsercontent.bind(this)
    this.click = this.click.bind(this)
    this.cancel = this.cancel.bind(this)
    this.showConfirm = this.showConfirm.bind(this)
  }

  setUsername(e){
    this.setState({name:e})
  }

  setUsertype(e){
    this.setState({type:e})
  }
  setUsercontent(e){
    this.setState({content:e})
  }

  showConfirm() {
    confirm({
      title: '警告！！！',
      content: '内容不能为空',
      onCancel() {},
    });
  }
  click(){
    console.log(this.props)
    let {name,type,content} = this.state;
    let value = {
      name,
      type,
      content
    }
    if(value.name && value.type && value.content){
      this.props.dispatch({type:'in',value});
      this.props.history.replace('/');
    }else{
      this.showConfirm()
    }
  }



  cancel(){
    this.props.history.replace('/');
  }
  render() {
    return (
      <div>
        <form>
          <Input placeholder="用户名" onChange={(e) => {this.setUsername(e.target.value)}} type="text" style={{marginTop:50, marginLeft: 700, width:400, height:40}}/><br/>        
          <Input placeholder="类型"   onChange={(e) => {this.setUsertype(e.target.value)}} type="text" style={{marginTop:10, marginLeft: 700, width:400, height:40}}/><br/> 
          <TextArea  rows={4}  defaultValue="" placeholder="评价"   onChange={(e) => {this.setUsercontent(e.target.value)}} type="text" style={{marginTop:10, marginLeft: 700, width:400,}}/><br/>
          <Button type="danger" style={{marginLeft: 700, width:200}} onClick={this.cancel} >取消</Button>
          <Button type="primary" style={{marginLeft: 0, width:200}} onClick={this.click} >提交</Button>
        </form>
      </div>
    );
  }
}

export default MyInfo;