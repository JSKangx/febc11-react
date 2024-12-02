import PropTypes from 'prop-types';
import styled from 'styled-components';

// styled가 제공해 주는 기본 html 들이 있다.
// 어떤 스타일을 적용할지는 tagged template 문법으로 넘겨주면 된다.
// 이렇게 넘겨주면 아래 스타일이 적용된 button 태그가 생성된다.
const BasicButtonStyle = styled.button`
  background-color: ${(props) => props.bg || '#4caf50'}; /* Green background */
  border: none; /* Remove borders */
  color: ${(props) => props.color || 'white'}; /* White text */
  padding: 6px 18px; /* Padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display as inline-block */
  font-size: ${(props) => props.size || '16px'}; /* Font size */
  margin: 4px 2px; /* Margin */
  cursor: pointer; /* Cursor pointer */
  border-radius: 6px; /* Border radius */
`;

// 상속도 가능
const BlueButton = styled(BasicButtonStyle)`
  background-color: blue;
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export function Button({ children, ...rest }) {
  return (
    <BasicButtonStyle type='button' {...rest}>
      {children}
    </BasicButtonStyle>
  );
}

Submit.propTypes = {
  children: PropTypes.string.isRequired,
};

// submit 동작하는 버튼을 따로 만듬.
export function Submit({ children, ...rest }) {
  return (
    <BlueButton type='submit' {...rest}>
      {children}
    </BlueButton>
  );
}
