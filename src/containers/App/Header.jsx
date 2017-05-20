import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import clipboard from 'clipboard-js';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ContentLink from 'material-ui/svg-icons/content/link';
import Emoticon from 'material-ui/svg-icons/Editor/insert-emoticon';
import Edit from 'material-ui/svg-icons/image/edit';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import {
  AppBar,
  Popover,
  Menu,
  MenuItem,
} from 'material-ui';

import config from '../../config';
import { staticImage } from '../../utils';
import './Header.scss';

export default class Header extends Component {
  static propTypes = {
    manageLogin: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      siteTitle: config.siteTitle,
      mainMenu: {
        open: false,
        anchorEl: null,
      },
      subMenu: {
        open: false,
        anchorEl: null,
      },
    };
    this.handleMainMenu = this.handleMainMenu.bind(this);
    this.handleSubMenu = this.handleSubMenu.bind(this);
  }

  handleMainMenu(event, type) {
    console.log(event);
    this.setState({
      mainMenu: {
        open: type,
        anchorEl: event.currentTarget,
      },
    });
  }

  handleSubMenu(event, type) {
    this.setState({
      subMenu: {
        open: type,
        anchorEl: event.currentTarget,
      },
    });
  }


  linkToEdit(e) {
    e.preventDefault();
    browserHistory.push('/edit');
  }

  linkToMypage(e) {
    e.preventDefault();
    browserHistory.push('/mypage');
  }

  copyClipboard() {
    clipboard.copy({
      'text/plain': window.location.href,
    });
  }

  render() {
    const { user, manageLogin } = this.props;
    const {
      siteTitle,
      mainMenu,
      subMenu,
    } = this.state;

    const picture = user.picture ? (
      <div>
        <img
          src={user.picture} alt={user.name}
          onClick={(event) => { this.handleSubMenu(event, true); }}
        />
      </div>
    ) : (
      <div>
        <img
          src={staticImage('no-image.png')} alt='no-image'
          onClick={(event) => { this.handleSubMenu(event, true); }}
        />
      </div>
    );

    return (
      <div styleName='conteiner'>
        <AppBar
          iconElementLeft={
            <IconButton
              onClick={(event) => { this.handleMainMenu(event, true); }}
            ><MenuIcon /></IconButton>}
          iconElementRight={picture}
          title={<Link to='/'>{siteTitle}</Link>}
        />
        <Popover
          open={mainMenu.open}
          anchorEl={mainMenu.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={(event) => { this.handleSubMenu(event, false); }}
        >
          <Menu>
            <MenuItem primaryText="NEW POST" leftIcon={<Edit />} onClick={this.linkToEdit} />
            <MenuItem primaryText="GET LINK" leftIcon={<ContentLink />} onClick={this.copyClipboard} />
          </Menu>
        </Popover>
        <Popover
          open={subMenu.open}
          anchorEl={subMenu.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={(event) => { this.handleSubMenu(event, false); }}
        >
          <Menu>
            <MenuItem primaryText="MYPAGE" leftIcon={<Emoticon />} onClick={this.linkToMypage} />
            <MenuItem primaryText="Logout" leftIcon={<Exit />}
              onClick={() => { manageLogin(false); }}
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}
