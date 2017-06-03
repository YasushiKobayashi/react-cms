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
      created: PropTypes.object.isRequired,
      updated: PropTypes.object.isRequired,
      wpFlg: PropTypes.bool.isRequired,
    })).isRequired,
  }

  render() {
    const { archives } = this.props;

    const iconStyle = Object.assign(style.icon, style.grayTxt, style.topIcon);

    const articles = archives.map((archive) => {
      const created = moment(archive.created).format('YYYY/MM/DD');
      const updated = moment(archive.updated).format('YYYY/MM/DD');
      const url = `/edit/${archive.id}`;
      const articleUrl = `/article/${archive.id}`;

      const wipStyle = archive.wpFlg ? null : style.hide;
      return (
        <dl styleName='content' key={archive.id}>
          <dt>
            <Link to={articleUrl}>
              <span styleName="wip" style={wipStyle} >WIP</span>
              {archive.title}
            </Link>
            <Link to={url}>
              <Edit style={iconStyle} hoverColor={style.blue} />
            </Link>
          </dt>
          <dd>
            <span>
              <Author style={iconStyle} />
              {archive.user.name}
            </span>
            <span>
              <Update style={iconStyle} />
              created&nbsp;
              {created}
            </span>
            <span>
              <Update style={iconStyle} />
              updated&nbsp;
              {updated}
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
