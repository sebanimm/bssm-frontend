import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { requestInterceptors, responseInterceptors } from "@/apis/interceptor";
import Storage from "@/apis/storage";
import refreshToken from "@/apis/token/refreshToken";
import TOKEN from "@/global/constants/token.constant";
import IClassLevel from "@/global/types/classLevel.type";
import KEY from "@/global/constants/key.constant";
import { QueryClient } from "react-query";
import IPostQuery from "@/global/types/postQuery.type";

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: { Authorization?: string };
}

export class HttpClient {
  private api: AxiosInstance;

  private static clientConfig: HttpClientConfig;

  constructor(url: string, axiosConfig: HttpClientConfig) {
    this.api = axios.create({
      ...axiosConfig,
      baseURL: `${axiosConfig.baseURL}${url}`,
    });
    HttpClient.clientConfig = { headers: { Authorization: "" } };
    this.setting();
  }

  get(requestConfig?: AxiosRequestConfig) {
    return this.api.get("", { ...HttpClient.clientConfig, ...requestConfig });
  }

  getById(requestConfig?: AxiosRequestConfig) {
    return this.api.get("/:id", {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  getTimetable(classLevel: IClassLevel, requestConfig?: AxiosRequestConfig) {
    return this.api.get(`/${classLevel.grade}/${classLevel.class}`, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  getByTitle(url: string, requestConfig?: AxiosRequestConfig) {
    return this.api.get(`/${url}`, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  getInQuery(
    param: string,
    data: string | number,
    requestConfig?: AxiosRequestConfig,
  ) {
    return this.api.get(`?${param}=${data}`, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  getPost(postConfig: IPostQuery, requestConfig?: AxiosRequestConfig) {
    const { postType, category } = postConfig;
    const postRenderLimit = Storage.getItem(TOKEN.POST_RENDER_LIMIT);

    const query = `https://bssm.kro.kr/api/post/${
      postType === "free" ? "board" : postType
    }/recent?startPostId=-1&limit=${postRenderLimit}&category=${category}`;

    return this.api.get(query, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  post(data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.post("", data, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  postInQuery(
    param: string,
    data: unknown,
    requestConfig?: AxiosRequestConfig,
  ) {
    return this.api.post(`?${param}=${data}`, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  put(data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.put("", data, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  putByTitle(title: string, data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.put(`/${title}`, data, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  delete(requestConfig?: AxiosRequestConfig) {
    return this.api.delete("", {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  deleteById(id: number, requestConfig?: AxiosRequestConfig) {
    return this.api.delete(`/${id}`, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  private setting() {
    HttpClient.setCommonInterceptors(this.api);
    const queryClient = new QueryClient();

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        queryClient.invalidateQueries(KEY.USER);
        refreshToken();
        return Promise.reject(error);
      },
    );
  }

  static setAccessToken() {
    const accessToken = Storage.getItem(TOKEN.ACCESS);
    HttpClient.clientConfig.headers = {
      ...HttpClient.clientConfig.headers,
      Authorization: accessToken || undefined,
    };
  }

  static removeAccessToken() {
    Storage.setItem(TOKEN.ACCESS, "");
  }

  private static setCommonInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(requestInterceptors as never);
    instance.interceptors.response.use(responseInterceptors);
  }
}

export const axiosConfig: HttpClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
};

export default {
  oauth: new HttpClient("api/auth/oauth/bsm", axiosConfig),
  user: new HttpClient("api/user", axiosConfig),
  timetable: new HttpClient("api/timetable", axiosConfig),
  post: new HttpClient("api/post/", axiosConfig),
};
