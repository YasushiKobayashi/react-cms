import React, { Component } from 'react';
import { Link } from 'react-router';
import { SelectField, MenuItem } from 'material-ui';
import ModeComment from 'material-ui/svg-icons/editor/mode-comment';
import Edit from 'material-ui/svg-icons/image/edit';
import Update from 'material-ui/svg-icons/action/update';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Sort from 'material-ui/svg-icons/content/sort';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import moment from 'moment';

import { Archive, Category } from '../../actions';
import { Loading } from '../../parts';
import style from '../../style';
import './Index.scss';

export default class Top extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: true,
      archives: null,
      categories: [],
      selectedCat: null,
      sorted: 'created',
      loading: true,
    };

    this.getArchives = this.getArchives.bind(this);
    this.handleSelectedCat = this.handleSelectedCat.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.getCategories().then((obj) => {
        this.setState({
          categories: obj,
        });
      }).catch((err) => {
        reject(err);
      });
    });
    return new Promise((resolve, reject) => {
      this.getArchives().then((obj) => {
        this.setState({
          archives: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  getArchives() {
    return new Promise((resolve, reject) => {
      Archive.getList().then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      Category.get().then((obj) => {
        resolve(obj);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleSelectedCat(event, index, value) {
    this.setState({
      selectedCat: value,
    });
  }

  handleSort(event, index, value) {
    this.setState({
      sorted: value,
    });
  }

  render() {
    const {
      loading,
      archives,
      categories,
      selectedCat,
      sorted,
    } = this.state;
    if (loading) return <Loading />;

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
              <Update style={iconStyle} />
              created
              {date}
            </span>
            <span>
              <Update style={iconStyle} />
              updated
              {date}
            </span>
            <span>
              <ModeComment style={iconStyle} />
              0
            </span>
          </dd>
        </dl>
      );
    });

    const cat = categories.map((category) => {
      return (
        <MenuItem
          key={category.id}
          value={category.slug}
          primaryText={category.name}
        />
      );
    });

    return (
      <div>
        <div styleName='topHeader'>
          <div styleName='list'>
            <ArchiveIcon style={iconStyle} />
            <span styleName='txt'>
              ALL:90
            </span>
            <span styleName='txt'>
              WIP:90
            </span>
            <ViewList style={iconStyle} />
            <span styleName='txt'>
              <SelectField
                floatingLabelText='CATEGORY'
                value={selectedCat}
                onChange={this.handleSelectedCat}
                style={style.selectField}
                autoWidth
              >
                {cat}
              </SelectField>
            </span>
            <Sort style={iconStyle} />
            <span styleName='txt'>
              <SelectField
                floatingLabelText='SORT'
                value={sorted}
                onChange={this.handleSort}
                style={style.selectField}
                autoWidth
              >
                <MenuItem value={'created'} primaryText='created' />
                <MenuItem value={'updated'} primaryText='updated' />
                <MenuItem value={'related'} primaryText='related' />
              </SelectField>
            </span>
          </div>
        </div>
        {articles}
      </div>
    );
  }
}
