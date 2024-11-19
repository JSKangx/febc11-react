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

  // 1-1
  constructor(props) {
    console.log('1-1 : constructor 호출됨');
    super(props);
    this.state = { count: props.level || 1 };
  }

  // 이미 Component에 정의되어 있는 메서드를 오버라이드함
  // 1-2 / 2-1
  static getDerivedStateFromProps(props, state) {
    console.log('1-2 / 2-1 : getDerivedStateFromProps 호출됨');
    console.log('   props', props);
    console.log('   state', state);

    if (state.count > props.level * 5) {
      return { count: 999 }; // 새로운 값으로 state를 업데이트
    }
    return null;
  }

  // 2-2
  shouldComponentUpdate(nextProps, nextState) {
    console.log('2-2 : shouldComponentUpdate 호출됨');

    return null;
  }

  // 1-3 / 2-4
  render() {
    console.log('1-3 / 2-3 : render 호출됨.');
    return (
      <>
        <div>
          클릭 횟수 X {this.props.level || 1}: {this.state.count}
          <button onClick={this.handleClick}>클릭</button>
        </div>
      </>
    );
  }

  // 1-4
  componentDidMount() {
    console.log('1-4 : componentDidMount 호출됨');
  }

  // 2-4
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('2-4 : getSnapshotBeforeUpdate 호출됨');
    return null;
  }

  // 2-5
  componentDidUpdate() {
    console.log('2-5 : componentDidUpdate 호출됨');
  }

  // 3-1
  componentWillUnmount() {
    console.log('3-1 : componentWillUnmount 호출됨');
  }
}

ClickMe.propTypes = {
  level: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>03 클래스 컴포넌트 - 컴포넌트의 라이프 사이클</h1>
        <ClickMe level={2} />
      </div>
    );
  }
}

export default Parent;
