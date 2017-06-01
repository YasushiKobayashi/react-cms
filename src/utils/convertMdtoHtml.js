import showdown from 'showdown';

export default (val) => {
  const converter = new showdown.Converter({
    simplifiedAutoLink: true,
    tables: true,
    tasklists: true,
    requireSpaceBeforeHeadingText: true,
  });
  return converter.makeHtml(val);
};
