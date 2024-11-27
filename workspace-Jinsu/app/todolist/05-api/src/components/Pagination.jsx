import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function Pagination({ totalPages, currentPage = 1 }) {
  const [searchParams] = useSearchParams();

  // 페이지네이션
  let pageList = [];

  // api 서버에 params로 page, limit를 사용하면 pagination객체를 얻을 수 있다.
  // params에 아무것도 안 넣으면 pagination은 빈 객체
  for (let page = 1; page <= totalPages; page++) {
    searchParams.set('page', page);
    // 'keyword=환승&page=1'
    // 'keyword=환승&page=2'
    // 'keyword=환승&page=3'

    // 위에서 설정한 searchParams를 문자열로 변환해서 search 변수에 할당
    let search = searchParams.toString();

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
