const kang = (() => {
  let _root;
  let _stateValue;
  // 지정한 속성과 자식 노드를 가지는 요소 노드를 생성해서 반환하는 함수
  /*
    button type="button" onclick="handleUp()">+</button>
    == createElement('button', { type: 'button', onclick: 'handleUp()' }, '+')
  */
  const createElement = (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 추가
    if (props) {
      // for ... in은 객체를 대상으로 순회하는 반복문
      for (const attrName in props) {
        // 객체[변수] : 변수를 활용해 객체의 속성에 접근하는 법
        const value = props[attrName];
        // 속성이 on으로 시작한다면 (이벤트 핸들러라면)
        if (attrName.toLowerCase().startsWith("on")) {
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        } else {
          elem.setAttribute(attrName, value);
        }
      }
    }

    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === "string" || typeof child === "number") {
        // 자식 노드가 문자열이나 숫자라면 텍스트로 만들고
        child = document.createTextNode(child);
      } else if (typeof child === "function") {
        // 함수라면 호출해서 받은 결과값을 반환
        child = child();
      } else if (Array.isArray(child)) {
        // 배열이라면 배열의 각 요소를 반복하여 appendChild
        child.forEach((child) => elem.appendChild(child));
      }
      // 그 외의 경우에는 그냥 appendChild 해주면 됨
      if (!Array.isArray(child)) elem.appendChild(child);
    }

    return elem;
  };

  // 루트 노드를 관리하는 객체를 생성해서 반환
  // createRoot(document.getElementById('root')).render(App); // 이렇게 사용
  const createRoot = (rootNode) => {
    let _appComponent;
    // 객체를 return
    return (_root = {
      // 루트 노드 하위에 지정한 함수를 실행해서 받은 컴포넌트를 렌더링한다.
      render(appFn) {
        // undefined면 appFn으로 대체.
        _appComponent = _appComponent || appFn; // 논리합 연산자
        if (rootNode.firstChild) {
          rootNode.firstChild.remove();
        }
        rootNode.appendChild(_appComponent());
      },
    });
  };

  // 상태값 관리. let [count, setCount] = Kang.useState(10);
  const useState = (initValue) => {
    /* 
      최초에 한 번 초기값을 할당. useState가 다시 호출되면 _stateValue !== undefined이기에, initValue는 무시하고 저장된 값을 사용.
    */
    if (_stateValue === undefined) {
      _stateValue = initValue;
    }

    // setValue(11);
    function setValue(newValue) {
      const oldValue = _stateValue; // oldValue === 10;
      _stateValue = newValue; // _stateValue === 11;

      // Object.is : 두 인수가 같은지 비교하는 함수. 같지 않을 경우에(상태 변경된 경우) 리렌더링한다.
      if (!Object.is(oldValue, newValue)) {
        _root.render();
      }
    }

    return [_stateValue, setValue];
  };

  return { createElement, createRoot, useState };
})();

export default kang;
