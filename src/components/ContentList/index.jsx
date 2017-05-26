import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ModeComment from 'material-ui/svg-icons/editor/mode-comment';
import Edit from 'material-ui/svg-icons/image/edit';
import Update from 'material-ui/svg-icons/action/update';
import Author from 'material-ui/svg-icons/action/perm-identity';
import moment from 'moment';

import style from '../../style';
import './index.scss';

export default class ContentList extends Component {
  static propTypes = {
    archives: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      commentsCount: PropTypes.number.isRequired,
      // dateObj: PropTypes.date.isRequired,
    })).isRequired,
  }

  render() {
    const { archives } = this.props;

    const iconStyle = Object.assign(style.icon, style.grayTxt, style.topIcon);

    const articles = archives.map((archive) => {
      const date = moment(archive.date).format('YYYY/MM/DD');
      const url = `/edit/${archive.id}`;
      const articleUrl = `/article/${archive.id}`;
      return (
        <dl styleName='content' key={archive.id}>
          <dt>
            <Link to={articleUrl}>
              {archive.title}
            </Link>
            <Link to={url}>
              <Edit style={iconStyle} hoverColor={style.blue} />
            </Link>
          </dt>
          <dd>
            <span>
              <Author style={iconStyle} />
              author&nbsp;
              {archive.user.name}
            </span>
            <span>
              <Update style={iconStyle} />
              created&nbsp;
              {date}
            </span>
            <span>
              <Update style={iconStyle} />
              updated&nbsp;
              {date}
            </span>
            <span>
              <ModeComment style={iconStyle} />
              {archive.commentsCount}
            </span>
          </dd>
        </dl>
      );
    });

    return (
      <div>
        {articles}
      </div>
    );
  }
}
