import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/lib/api";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
} from "../slices/authSlice";
import {
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
} from "../slices/postsSlice";
import {
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess,
} from "../slices/commentsSlice";

function* loginWorker(action: ReturnType<typeof loginRequest>) {
  try {
    const { data } = yield call(api.post, "/auth/login", {
      username: action.payload.username,
      password: action.payload.password,
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      document.cookie = `token=${data.token}; path=/; max-age=3600`;
    }
    yield put(
      loginSuccess({
        token: data.token,
        user: { id: data.id, firstName: data.firstName, email: data.email },
      })
    );
  } catch (error: any) {
    yield put(loginFailure(error?.message || "Login failed"));
  }
}

function* logoutWorker() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0";
  }
}

function* postsWorker(action: ReturnType<typeof fetchPostsRequest>) {
  try {
    const payload = action.payload || {};
    const endpoint = payload.q
      ? `/posts/search?q=${encodeURIComponent(payload.q)}`
      : `/posts?limit=${payload.limit || 10}&skip=${payload.skip || 0}`;
    const { data } = yield call(api.get, endpoint);
    yield put(fetchPostsSuccess({ posts: data.posts, total: data.total }));
  } catch (error: any) {
    yield put(fetchPostsFailure(error?.message || "Failed to load posts"));
  }
}

function* commentsWorker(action: ReturnType<typeof fetchCommentsRequest>) {
  try {
    const { data } = yield call(api.get, `/comments/post/${action.payload}`);
    yield put(
      fetchCommentsSuccess({ postId: action.payload, comments: data.comments })
    );
  } catch (error: any) {
    yield put(fetchCommentsFailure(error?.message || "Failed to load comments"));
  }
}

export function* rootSaga() {
  yield all([
    takeLatest(loginRequest.type, loginWorker),
    takeLatest(logout.type, logoutWorker),
    takeLatest(fetchPostsRequest.type, postsWorker),
    takeLatest(fetchCommentsRequest.type, commentsWorker),
  ]);
}
