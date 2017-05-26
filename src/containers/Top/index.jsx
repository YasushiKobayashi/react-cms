import React, { Component } from 'react';
import { SelectField, MenuItem, TextField } from 'material-ui';
import SearchedFor from 'material-ui/svg-icons/action/youtube-searched-for';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Sort from 'material-ui/svg-icons/content/sort';
import _ from 'lodash';


import { Archive, Category } from '../../actions';
import { ContentList } from '../../components';
import { Loading } from '../../parts';
import style from '../../style';
import './index.scss';

export default class Top extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
      archives: null,
      categories: [],
      serach: '',
      selectedCat: null,
      sorted: 'created',
      loading: true,
    };

    this.getCategory = this.getCategory.bind(this);
    this.getList = this.getList.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
    this.handleSerach = this.handleSerach.bind(this);
    this.handleSelectedCat = this.handleSelectedCat.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    Promise.resolve().then(() => {
      return Promise.all([this.getCategory(), this.getList()]);
    });
  }

  getCategory() {
    return new Promise((resolve, reject) => {
      Category.get().then((obj) => {
        return obj;
      }).then((obj) => {
        this.setState({
          categories: obj,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  getList() {
    return new Promise((resolve, reject) => {
      Archive.getList('post').then((obj) => {
        return obj;
      }).then((obj) => {
        this.setState({
          archives: obj,
          loading: false,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  sendSearch() {
    const param = { word: this.state.serach };
    return new Promise((resolve, reject) => {
      Archive.serachArticle(param).then((obj) => {
        return obj;
      }).then((obj) => {
        this.setState({
          archives: obj,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  handleSerach(event) {
    const val = event.target.value;
    this.setState({
      serach: val,
    });
  }

  handleSelectedCat(event, index, value) {
    this.setState({
      selectedCat: value,
    });
    new Promise((resolve, reject) => {
      Archive.getListFromCategory(value).then((obj) => {
        return obj;
      }).then((obj) => {
        this.setState({
          archives: obj,
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }


  handleSort(event, index, value) {
    const { archives } = this.state;
    if (value === 'updated') {
      _.sortBy(archives, 'dateObj');
    } else if (value === 'updated') {
      _.sortBy(archives, 'dateObj');
    } else {
      _.sortBy(archives, 'dateObj');
    }
    this.setState({
      archives: archives,
      sorted: value,
    });
  }

  render() {
    const {
      loading,
      archives,
      serach,
      categories,
      selectedCat,
      sorted,
    } = this.state;
    if (loading) return <Loading />;

    const iconStyle = Object.assign(style.icon, style.grayTxt, style.topIcon);
    const cat = categories.map((category) => {
      return (
        <MenuItem
          key={category.id}
          value={category.id}
          primaryText={category.name}
        />
      );
    });

    return (
      <div>
        <div styleName='topHeader'>
          <div styleName='list'>
            <span>
              <SearchedFor
                style={iconStyle}
                onClick={this.sendSearch}
              />
            </span>
            <TextField
              floatingLabelText='search'
              onChange={this.handleSerach}
              value={serach}
              style={style.titleField}
            />
            <span><ViewList style={iconStyle} /></span>
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
            <span><Sort style={iconStyle} /></span>
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
              </SelectField>
            </span>
          </div>
        </div>
        <ContentList archives={archives} />
      </div>
    );
  }
}
