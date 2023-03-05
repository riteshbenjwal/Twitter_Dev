export const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export const mockRequest = () => {
  const req = {};
  req.json = jest.fn().mockReturnValue(req);
  req.status = jest.fn().mockReturnValue(req);
  req.send = jest.fn().mockReturnValue(req);
  return req;
};
