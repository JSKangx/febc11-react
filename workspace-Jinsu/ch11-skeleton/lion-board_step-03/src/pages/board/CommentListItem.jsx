import useAxiosInstance from '@hooks/useAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import useUserStore from '../../zutand/userStore';

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      image: PropTypes.object,
      name: PropTypes.string,
      _id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default function CommentListItem({ item }) {
  const { user } = useUserStore(); // 로그인한 유저 정보
  const axios = useAxiosInstance();
  const { _id } = useParams();

  const queryClient = useQueryClient();

  const removeItem = useMutation({
    mutationFn: (_id) => {
      const ok = confirm('댓글을 삭제하시겠습니까?');
      if (ok) {
        axios.delete(`/posts/${_id}/replies/${item._id}`);
      }
    },
    onSuccess: () => {
      // 댓글 삭제 후 게시글 데이터 캐시 삭제, 리렌더링
      queryClient.invalidateQueries({ queryKey: ['posts', _id] });
    },
  });

  const onSubmit = () => {
    removeItem.mutate(_id);
  };

  return (
    <div className='shadow-md rounded-lg p-4 mb-4'>
      <div className='flex justify-between items-center mb-2'>
        {item.user.image && (
          <img
            className='w-8 mr-2 rounded-full'
            src={`https://11.fesp.shop${item.user.image.path}`}
            alt={`${item.user.name}의 프로필 이미지`}
          />
        )}
        <Link to='' className='text-orange-400'>
          {item.user.name}
        </Link>
        <time className='ml-auto text-gray-500' dateTime={`${item.updatedAt}`}>
          {item.updatedAt}
        </time>
      </div>
      <div className='flex justify-between items-center mb-2'>
        <pre className='whitespace-pre-wrap text-sm'>{item.content}</pre>
        {user?._id === item.user._id && (
          <>
            <button
              onClick={onSubmit}
              className='bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded'
            >
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}
