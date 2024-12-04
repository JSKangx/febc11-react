import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// 페이지네이션 UI를 생성하고, 각 페이지 링크를 클릭했을 때 URL 쿼리 스트링을 통해 해당 페이지를 이동할 수 있도록 처리하는 함수
function Pagination({ totalPages, currentPage = 1 }) {
  // 현재 URL의 쿼리 스트링을 조작할 수 있는 객체
  const [searchParams] = useSearchParams();

  // 페이지네이션: li 태그를 담는 배열. 이 배열이 렌더링된다.
  let pageList = [];

  // api 서버에 목록을 요청할 때 pagination 객체를 자동으로 얻을 수 있다. params에 아무것도 안 넣으면 pagination은 빈 객체.
  // params로 page, limit를 전달하면 입력한 값에 따라 전체 목록이 몇 페이지로 나뉠지에 대한 pagination 객체가 넘어온다.
  // keyword는 조작하지 않고, page 속성만 추가해준다.
  for (let page = 1; page <= totalPages; page++) {
    // 현재 페이지의 URL에 'page=1'...(증가하며)을 추가
    searchParams.set('page', page);
    // 'keyword=환승&page=1'
    // 'keyword=환승&page=2'
    // 'keyword=환승&page=3'
    // 만약 키워드가 없다면 'page=1', 'page=2' ... 이렇게 될 것.

    // searchParams안에는 toString()이라는 메서드가 있어서, 쿼리 스트링을 문자열로 변환해준다.
    // 현재 페이지의 쿼리 스트링을 문자열로 변환.
    let search = searchParams.toString();

    // 현재 페이지에 해당하는 링크를 생성
    // 현재 페이지에 따라 active 클래스 적용 여부 결정
    pageList.push(
      <li key={page} className={currentPage === page ? 'active' : ''}>
        <Link to={`/list?${search}`}>{page}</Link>
      </li>
    );
  }

  return (
    <div className='pagination'>
      <ul>{pageList}</ul>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
};

export default Pagination;
