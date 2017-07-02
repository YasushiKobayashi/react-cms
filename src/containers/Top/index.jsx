/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { SelectField, MenuItem, TextField } from 'material-ui';
import SearchedFor from 'material-ui/svg-icons/action/youtube-searched-for';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Sort from 'material-ui/svg-icons/content/sort';

import * as actions from '../../actions/archivesAction';
import type { ArticleType } from '../../types/ArticleType';
import type { CategoryType } from '../../types/CategoryType';
import * as constant from '../../constant';
import { hamlet } from '../../utils';

import { ContentList } from '../../components';
import { Loading } from '../../parts';

import style from '../../style';
import './index.scss';

class Top extends Component {
  props: {
    actions: {
      loadAllContent: Function,
      getArticlesFromCat: Function,
      serachArticles: Function,
      sortArticles: Function,
      loadAllFromCategory: Function,
    },
    top: {
      archives: Array<ArticleType>,
      categories: Array<CategoryType>,
      isLoading: boolean,
    },
  };

  state: {
    serach: string,
    sorted: string,
    selectedCat: string,
  };
  setState: Function;
  sendSearch: Function;
  handleSerach: Function;
  handleSort: Function;
  handleSelectedCat: Function;

  constructor() {
    super();
    this.state = {
      serach: '',
      sorted: 'created',
      selectedCat: '未選択',
    };

    this.sendSearch = this.sendSearch.bind(this);
    this.handleSerach = this.handleSerach.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSelectedCat = this.handleSelectedCat.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadAllContent();

    // @TODO カテゴリパラメータ
    // const getParam = params.decode();
    // if (getParam.category) {
    //   this.handleSelectedCategory(getParam.category);
    // }
  }

  handleSelectedCat(event, index, value) {
    this.setState({
      selectedCat: value,
    });
    this.props.actions.loadAllFromCategory(value);
  }

  updateContent() {
    const { selectedCat } = this.state;
    this.props.actions.getArticlesFromCat(selectedCat);
  }

  handleSerach(e) {
    const val = e.target.value;
    this.setState({
      serach: val,
    });
  }

  sendSearch(e) {
    const ENTER = 13;
    if (e.keyCode !== ENTER) {
      return false;
    }
    const param = { word: this.state.serach };
    this.props.actions.serachArticles(param);
  }

  handleSort(event, index, value) {
    this.setState({
      sorted: value,
    });
    this.props.actions.sortArticles(value);
  }

  render() {
    const {
      serach,
      selectedCat,
      sorted,
    } = this.state;
    const { categories, archives, isLoading } = this.props.top;

    if (isLoading) return <Loading />;

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
        <Helmet
          title={hamlet.title(constant.TITLE_TOP)}
          meta={hamlet.meta(hamlet.title(constant.TITLE_TOP))}
        />
        <div styleName='topHeader'>
          <div styleName='list'>
            <span>
              <SearchedFor
                style={iconStyle}
                hoverColor={style.blue}
                onClick={this.sendSearch}
              />
            </span>
            <TextField
              floatingLabelText='search'
              onChange={this.handleSerach}
              onKeyDown={this.sendSearch}
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
                <MenuItem value={'未選択'} primaryText='未選択' />
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

const mapState = (state) => {
  return {
    top: state.top,
  };
};
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapState, mapDispatch)(Top);
