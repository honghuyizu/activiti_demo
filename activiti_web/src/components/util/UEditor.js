import React from 'react';
import { Spin } from 'antd';
import * as projectConfig from '../../utils/projectConfig';
import * as projectUtil from '../../utils/rbacProjectUtil';

class UEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  loadUE() {
    const configUrl = projectConfig.UEDITOR_ROOT_URL + `/ueditor.config.js`;
    const url = projectConfig.UEDITOR_ROOT_URL + `/ueditor.all.js`;
    const langUrl = projectConfig.UEDITOR_ROOT_URL + `/lang/zh-cn/zh-cn.js`;
    // 添加顺序不能变，否则会报错
    projectUtil.dynamicAddScriptToHtml(configUrl, () => {
      projectUtil.dynamicAddScriptToHtml(url, () => {
        projectUtil.dynamicAddScriptToHtml(langUrl, ::this.initUE);
      });
    });
  }

  initUE() {
    const baseURL = projectConfig.UEDITOR_ROOT_URL + "/";
    const id = this.props.id;
    const ue = this.ue = UE.getEditor(id, {
      UEDITOR_HOME_URL: baseURL,
      serverUrl: projectConfig.UEDITOR_ROOT_URL + `/jsp/controller.jsp`,
      initialFrameHeight: this.props.height,
      zIndex: this.props.inModal ? 1001 : 999,
      autoHeight: false,
      autoFloatEnabled: !this.props.inModal,
      removeFormatAttributes: 'lang, align, hspace, valign',
    });

    ue.ready(() => {
      let value = this.props.value ? this.props.value : '<p></p>';
      ue.setContent(value);
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    if (!window.baidu || !baidu.editor) {
      this.loadUE();
      this.setState({ loading: true });
    } else {
      this.initUE();
    }
  }

  componentWillUnmount() {
    // 一定要写这一句
    this.ue.destroy();
  }

  render() {
    return (
      <div style={{ lineHeight: 1 }}>
        { this.state.loading ? <Spin /> : null}
        <script id={this.props.id} name="content" type="text/plain" />
      </div>
    );
  }
}

UEditor.defaultProps = {
  content: '',
  width: 375,
  height: 250,
  withXiumi: false,
  inModal: false,
};

export default UEditor;
