import {
  DOWNLOAD_TRAINING_PAGE_FAIL,
  DOWNLOAD_TRAINING_PAGE_PROGRESS, DOWNLOAD_TRAINING_PAGE_SUCCESS,
  LOAD_TRAINING_PAGE_LIST, LOAD_TRAINING_PAGE_LIST_FAIL, LOAD_TRAINING_PAGE_LIST_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TRAINING_PAGE_LIST:
      return { ...state, loading: true, data: [] };
    case LOAD_TRAINING_PAGE_LIST_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TRAINING_PAGE_LIST_FAIL:
      return { ...state, loading: false, error: payload.error };
    case DOWNLOAD_TRAINING_PAGE_PROGRESS:
      return {
        ...state,
        data: state.data.map((item) => {
          if (payload.content_id === item.content_id) {
            item.failed = false;
            item.progress = payload.progress;
          }
          return item;
        })
      };
    case DOWNLOAD_TRAINING_PAGE_FAIL:
      return {
        ...state,
        data: state.data.map((item) => {
          if (payload.content_id === item.content_id) {
            item.failed = true;
          }
          return item;
        })
      };
    case DOWNLOAD_TRAINING_PAGE_SUCCESS:
      return {
        ...state,
        data: state.data.map((item) => {
          if (payload.content_id === item.content_id) {
            item.downloaded = true;
          }
          return item;
        })
      };
    default:
      return state;
  }
};
