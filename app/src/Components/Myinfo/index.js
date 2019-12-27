import React,{Component} from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import {connect} from 'react-redux'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="创建"
          okText="创建"
          cancelText='取消'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '输入名称' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="类型">
              {getFieldDecorator('type',  {
                rules: [{ required: true, message: '输入类型' }],
              })(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="内容">
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '输入内容' }],
              })(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);


let mapStateToProps = (state) =>{
  return {
    todoListReducer: state.todoListReducer
  }
}

@connect(mapStateToProps)
class MyInfo extends React.Component {
  state = {
    visible: true,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.props.history.replace('/');

  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.dispatch({type:'in',values});
      this.props.history.replace('/');
      form.resetFields();
      
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


export default MyInfo;