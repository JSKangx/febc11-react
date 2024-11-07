const kang = {
  // 지정한 속성과 자식 노드를 가지는 요소 노드를 생성해서 반환하는 함수
  /*
    button type="button" onclick="handleUp()">+</button>
    == createElement('button', { type: 'button', onclick: 'handleUp()' }, '+')
  */
  createElement: (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 추가
    if (props) {
      // for ... in은 객체를 대상으로 순회하는 반복문
      for (const attrName in props) {
        // 객체[변수] : 변수를 활용해 객체의 속성에 접근하는 법
        elem.setAttribute(attrName, props[attrName]);
      }
    }

    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === "string" || typeof child === "number") {
        // 자식 노드가 문자열이나 숫자라면 텍스트로 만들고
        child = document.createTextNode(child);
      }
      // 그 외의 경우에는 그냥 appendChild 해주면 됨
      elem.appendChild(child);
    }

    return elem;
  },
};

export default kang;
