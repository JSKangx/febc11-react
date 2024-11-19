import { Component } from 'react';
import PropTypes from 'prop-types';

class ClickMe extends Component {
  // 상태관리하는 변수 state/setState는 Component에 정의되어 있는 이름
  // class 컴포넌트에서 상태는 state 변수 하나만 사용 가능하기에, 여러개의 상태를 관리하려면 state를 객체로 만들어줘야 한다.
  state = { count: 0 };

  // 메서드를 쓸 때 화살표 함수로 작성해야 this.state 등에 접근가능하다.
  handleClick = () => {
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  render() {
    return (
      <>
        <div>
          클릭 횟수 X {this.props.level || 1}: {this.state.count}
          <button onClick={this.handleClick}>클릭</button>
        </div>
      </>
    );
  }
}

ClickMe.propTypes = {
  level: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>01 클래스 컴포넌트</h1>
        <ClickMe level={2} />
        <ClickMe level={5} />
        <ClickMe />
      </div>
    );
  }
}

export default Parent;
