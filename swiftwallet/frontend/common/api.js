const BASE_URL = "https://api.swiftwallet.com/v1";

export const apiRequest = (endpoint, method = "GET", data = {}) => {
  return new Promise((resolve, reject) => {
    qa.request({
      url: BASE_URL + endpoint,
      method,
      data,
      headers: {
        Authorization: getApp().globalData.token,
      },
      success: (res) => resolve(res.data),
      fail: (err) => reject(err),
    });
  });
};
