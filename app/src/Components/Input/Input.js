import React from 'react';
import { Input,Button } from 'antd';

const { Search } = Input;

class Myinput extends React.Component{
    constructor(){
        super();
        this.state =({
            value: '',
        })
        this.onSearch = this.onSearch.bind(this);
        this.handResets = this.handResets.bind(this);
        this.handChange = this.handChange.bind(this);
    }
    onSearch(value ){
        this.props.handSearch(value);
    }
    handResets(){
        this.props.handReset();
        this.setState({
            value: '',
        });
    }
    handChange(e){
        this.setState({
            value: e.target.value,
        });
    }
    


    render(){
        return <div>
        <Search
          placeholder="名称"
          enterButton="搜索"
          size="large"
          onSearch={value => this.onSearch(value) }
          value = {this.state.value}
          onChange={e => this.handChange(e)}
          style={{width:'500px', marginLeft:'600px', marginTop:10}}
        />
        <Button onClick={this.handResets} size='large' style={{background:'#fff',color:'#000',marginTop:10}}>重置</Button>
      </div>
    }
}
export default Myinput;