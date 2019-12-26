/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Spin, Button} from 'antd';
import 'antd/dist/antd.css';
// import CollectionCreateForm from '../Components/Create/Create'
// import Search from '../Search/Search'
// import Myinput from '../Components/Input/Input'
import Myinput from '../Components/Input/Input'
import { Route, Switch,} from 'react-router-dom';
// import store from '../store'
// import {
//   createFetchAction,
//   createDeleteAction,
//   createSearchAction,
//   createResetAction,
//   createAction,
//   createSavesAction,
//   createEditAction,
//   cancelAction
// } from '../Actions/todoList'
import {connect} from 'react-redux'

// const data = null;

let mapStateToProps = (state) =>{
  return {
    todoListReducer: state.todoListReducer
  }
}
// let mapDispatchToPropst = (dispatch)=>{
//   return {
//     fetch:(res)=>{
//       dispatch(createFetchAction(res))
//     },
//     delete: (id) => {
//       dispatch(createDeleteAction(id));
//     },
//     searcha: (value) => {
//       dispatch(createSearchAction(value));
//     },
//     reset: () => {
//       dispatch(createResetAction());
//     },
//     create: (values) => {
//       dispatch(createAction(values));
//     },
//     saves: (values) => {
//       dispatch(createSavesAction(values));
//     },
//     edit: (id) => {
//       dispatch(createEditAction(id));
//     },
//     cancel: () => {
//       dispatch( cancelAction());
//     },
//   }
// }

const EditableContext = React.createContext();

//修改类
class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    renderCell = ({ getFieldDecorator }) => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ],
                initialValue: record[dataIndex],
              })(this.getInput())}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    render() {

      return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}
@connect(mapStateToProps)
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // data: store.getState().todoListReducer.data,
      editingKey: '',
      visible: false, 
      loading: false,
    };
    // store.subscribe(this.listening)
    const {todoListReducer:{data}} =this.props;
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '类型',
        dataIndex: 'type',
        editable: true,
      },
      {
        title: '创建时间',
        dataIndex: 'date',
        editable: true,
        
      },
      {
        title: '内容',
        width: '25%',
        dataIndex: 'content',
        editable: true,
      },
      {
        title: '修改',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定要取消吗?" onConfirm={() => this.cancels(record.id)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edits(record.id)}>
              修改
            </a>
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'delete',
        render: (text, record) =>
          data.length >= 0 ? (
            <Popconfirm title="你确定要删除吗？" onConfirm={() => this.handleDelete(record.id)}>
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.isEditing = this.isEditing.bind(this)
    this.handReset = this.handReset.bind(this)
    this.save = this.save.bind(this)
    // this.handleCreate = this.handleCreate.bind(this)
    this.handSearch = this.handSearch.bind(this)
    this.edits = this.edits.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    
  }

  isEditing = record => record.id === this.state.editingKey;

  cancels = () => {
    // this.props.cancel()
    this.setState({ editingKey: '' });
  };

  //修改
  save(form, id) {
    const {todoListReducer:{data}} =this.props;
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      
      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        let value = {row,id}
        this.props.dispatch({type:'sa',value})
        this.setState({editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edits(id) {
    this.setState({ editingKey: id });
  }

  //删除方法
  handleDelete=(id)=>{
    this.props.dispatch({type:'de',id})
  }

  //添加方法
  // handleCancel = () => {
  //   this.setState({ visible: false });
  // };
  // handleCreate = () => {
  //   const { form } = this.formRef.props;
  //   form.validateFields((err, values) => {
  //     if (err) {
  //       return;
  //     }
 
  //     form.resetFields();

  //     this.setState({ visible: false });
  //     this.props.dispatch({type:'in',values})
  //   });
  // };

  // showModal = () => {
  //   this.setState({ visible: true });
  // };

  // saveFormRef = formRef => {
  //   this.formRef = formRef;
  // };



  //搜索方法
  handSearch(value){ 
    this.props.dispatch({type:'mo',value})
  }

  //重置方法
  handReset(){
    this.props.dispatch({type:'re'})
  }

  //生命周期  加载后
  componentDidMount(){
    this.props.dispatch({type:'fe'})
  }

  render() {
    const {todoListReducer:{data}} =this.props;
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div>
        { data
          ?<div>
              
              <Myinput handSearch={this.handSearch} style={{marginLeft:0}} handReset={this.handReset}></Myinput>
              {/* <Button type="primary" onClick={this.showModal} style={{marginLeft:10}}>
                创建
              </Button> */}
              <Switch>
                  <Route path="/" component={tiao}></Route>
              </Switch>
              {/* <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
              /> */}
              <EditableContext.Provider value={this.props.form}>
                <Table
                  components={components}
                  bordered
                  dataSource={data}
                  columns={columns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: this.cancels,
                  }}
                  rowKey={(data)=>data.id}
                />
              </EditableContext.Provider>
            </div>
          : <Spin style={{marginLeft:'900px',marginTop:'200px'}} tip="加载中..." size='large'/>
        }
      </div>
      
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);


//添加创建组件
const tiao= function(props){
  const click=()=>{
    props.history.replace('/myinfo');
  }

  return (
    <Button type="primary" size='large' onClick={click} style={{marginTop:20}}>创建</Button>
  )
}


class Mytable extends Component{ 
    render(){
        return <EditableFormTable />
    }
}

export default Mytable;