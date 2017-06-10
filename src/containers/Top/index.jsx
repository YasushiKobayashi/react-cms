import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SelectField, MenuItem, TextField } from 'material-ui';
import SearchedFor from 'material-ui/svg-icons/action/youtube-searched-for';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Sort from 'material-ui/svg-icons/content/sort';

import * as actions from '../../actions/topAction';
import type { Article } from '../../types/Article';

import { ContentList } from '../../components';
import { Loading } from '../../parts';

import style from '../../style';
import './index.scss';

class Top extends Component {
  props: {
    top: {
      archives: Array<Article>,
      categories: Array,
    },
    actions: Array<Function>,
  };

  state: {
    isLoading: Boolean,
    serach: String,
    sorted: String,
  };

  constructor() {
    super();
    this.state = {
      isLoading: false,
      serach: '',
      sorted: 'created',
    };

    this.sendSearch = this.sendSearch.bind(this);
    this.handleSerach = this.handleSerach.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadContent();
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps.top;
    this.setState({
      isLoading: isLoading,
    });
  }

  handleSerach(e) {
    const val = e.target.value;
    this.setState({
      serach: val,
    });
  }

  sendSearch() {

  }

  handleSort(e) {
    console.log(e);
    const val = e.target.value;
    this.setState({
      sorted: val,
    });
  }

  render() {
    const {
      isLoading,
      serach,
      selectedCat,
      sorted,
    } = this.state;
    const { categories, archives } = this.props.top;

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
