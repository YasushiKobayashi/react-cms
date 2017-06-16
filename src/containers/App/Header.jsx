import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import clipboard from 'clipboard-js';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ContentLink from 'material-ui/svg-icons/content/link';
import Emoticon from 'material-ui/svg-icons/editor/insert-emoticon';
import Edit from 'material-ui/svg-icons/image/edit';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import {
  AppBar,
  Popover,
  Menu,
  MenuItem,
} from 'material-ui';

import type { User } from '../../types/User';
import config from '../../config';
import './Header.scss';

export default class Header extends Component {
  props: {
    user: User,
    logout: Function,
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
    this.closeMainMenu = this.closeMainMenu.bind(this);
    this.closeSubMenu = this.closeSubMenu.bind(this);
    this.linkTo = this.linkTo.bind(this);
  }

  handleMainMenu(event, type) {
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

  closeMainMenu() {
    this.setState({
      mainMenu: {
        open: false,
      },
    });
  }

  closeSubMenu() {
    this.setState({
      subMenu: {
        open: false,
      },
    });
  }


  linkTo(e) {
    e.preventDefault();
    const url = e.currentTarget.getAttribute('data-url');
    browserHistory.push(`/${url}`);
    this.closeMainMenu();
    this.closeSubMenu();
  }

  copyClipboard() {
    clipboard.copy({
      'text/plain': window.location.href,
    });
  }

  render() {
    const { user, logout } = this.props;
    const {
      siteTitle,
      mainMenu,
      subMenu,
    } = this.state;

    const picture = (
      <div>
        <img
          src={user.image} alt={user.name}
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
          onRequestClose={this.closeMainMenu}
        >
          <Menu>
            <MenuItem
              primaryText="NEW POST" leftIcon={<Edit />}
              onClick={this.linkTo} data-url="edit"
            />
            <MenuItem primaryText="GET LINK" leftIcon={<ContentLink />} onClick={this.copyClipboard} />
          </Menu>
        </Popover>
        <Popover
          open={subMenu.open}
          anchorEl={subMenu.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.closeSubMenu}
        >
          <Menu>
            <MenuItem
              primaryText='MYPAGE' leftIcon={<Emoticon />}
              onClick={this.linkTo} data-url="mypage"
            />
            <MenuItem
              primaryText='Logout' leftIcon={<Exit />}
              onClick={logout}
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}
