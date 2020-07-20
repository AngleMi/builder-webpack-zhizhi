import React from 'react';
import ReactDOM from 'react-dom';
import '../../common';
import logo from './images/logo.png';
import './search.less';
import { a } from './tree-shaking.js';
import largeNum from 'large-num-zhizhi';

class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null,
        };
    }

    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default,
            });
        });
    }

    render() {
        const funcA = a();
        const { Text } = this.state;
        const addNum = largeNum('999', '2');
        return (
          <div className="search-text">
                { addNum }<br/>
                Text:{ Text ? <Text /> : null}
                { funcA }
              搜索文件的内容hahhah<img src={logo} onClick={this.loadComponent.bind(this)} />
            </div>
        );
    }
}

ReactDOM.render(
  <Search />,
    document.getElementById('root'),
);
