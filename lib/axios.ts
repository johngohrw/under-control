import axios from "axios";

export default class API {
  static call = async ({
    url = "",
    method = "GET",
    data = {},
  }: {
    url: string;
    method?: keyof typeof HTTPMethodEnum;
    data?: object;
  }) => {
    return await axios({
      url,
      method,
      ...(method === "GET" ? { params: data } : { data: data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
enum HTTPMethodEnum {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}
