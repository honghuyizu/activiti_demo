import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { connect } from 'dva';
import { Button, Icon, Tooltip } from 'antd';
import styles from '../../../../../styles/index/my_dashboard/my_info/UpdateAvatar.less';
import defaultAvatar from '../../../../../images/sex/male.png';

class REdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      src: defaultAvatar,
      cropResult: null,
    };
    this.onChange = this.onChange.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.cropAvatar = this.cropAvatar.bind(this);
    this.saveAvatar = this.saveAvatar.bind(this);
    this.gotoView = this.gotoView.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  zoomOut() {
    this.cropper.zoom(0.1);
  }

  zoomIn() {
    this.cropper.zoom(-0.1);
  }

  rotateLeft() {
    this.cropper.rotate(-90);
  }

  rotateRight() {
    this.cropper.rotate(90);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropAvatar() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  saveAvatar() {
    //console.log(this.state.cropResult);
    if (this.state.cropResult === null) {
      this.cropAvatar();
    }
    let avatar = this.state.cropResult;
    if (avatar !== null) {
      if (avatar.startsWith('data:image/png;base64,')) {
        avatar = avatar.replace('data:image/png;base64,', '');
      }
      this.props.onSave(avatar);
    }
  }

  gotoView() {
    this.context.router.push('/index/my_dashboard/my_info/update_avatar');
  }

  render() {
    return (
      <div className={styles.cFormLayout}>
        <div className={styles.cropperLayout}>
          <div className={styles.cropper} onDoubleClick={this.cropAvatar}>
            <Tooltip title="双击预览头像">
              <Cropper
                style={{ width: '100%', height: 400 }}
                aspectRatio={ 1 / 1 }
                guides={ false }
                src={ this.state.src }
                ref={ cropper => { this.cropper = cropper; } }/>
            </Tooltip>
          </div>
          <div className={styles.toolbar}>
            <a href="javascript:void(0)"  className={styles.aUpload}>
              <Icon type="select"/>&nbsp;&nbsp;选择文件
              <input type="file" onChange={this.onChange}/>
            </a>
            <Button.Group className={styles.buttonGroup}>
              <Button onClick={this.zoomOut}><Icon type="plus-circle-o"/>放大&nbsp;&nbsp;&nbsp;</Button>
              <Button onClick={this.zoomIn}><Icon type="minus-circle-o"/>缩小&nbsp;&nbsp;&nbsp;</Button>
            </Button.Group>
            <Button.Group className={styles.buttonGroup}>
              <Button onClick={this.rotateLeft}><Icon type="reload" style={{transform: 'rotateY(180deg)'}}/>左转&nbsp;&nbsp;&nbsp;</Button>
              <Button onClick={this.rotateRight}><Icon type="reload" />右转&nbsp;&nbsp;&nbsp;</Button>
            </Button.Group>
            <Button.Group className={styles.buttonGroup}>
              <Button onClick={this.cropAvatar}><Icon type="smile-o"/>预览&nbsp;&nbsp;&nbsp;</Button>
              <Button onClick={this.saveAvatar}><Icon type="save"/>保存&nbsp;&nbsp;&nbsp;</Button>
            </Button.Group>
            <Button.Group className={styles.buttonGroup}>
              <Button onClick={this.gotoView}><Icon type="rollback"/>返回&nbsp;&nbsp;&nbsp;</Button>
            </Button.Group>
          </div>
        </div>
        <div className={styles.previewLayout}>
          <img style={{height: 140, width: 140}} src={this.state.cropResult}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cropResult: state.cropResult }
}


function mapDispatchToProps(dispatch) {
  return {

  onSave: (cropResult) => dispatch({
      type: 'updateAvatar/updateAvatar',
      payload: { avatar: cropResult },
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(REdit);
