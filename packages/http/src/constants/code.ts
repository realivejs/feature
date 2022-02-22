export enum RESPONSE_CODE {
  // 若没有response时，或业务code为-1时，业务方只需要处理0与-1即可
  HTTP_ERROR = "-1",
  // 成功
  BUS_SUCCESS = "0",
  // 特殊错误code（未登陆）
  LOGOUT_ERROR = "350F9D68221A0DB19024EE40CFC3C7F8",
}
