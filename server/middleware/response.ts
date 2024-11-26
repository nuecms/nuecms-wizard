const patchData = (data: any) => {
  if (typeof data === 'string') {
    return { msg: data }
  }
  if (data.error !== undefined && data.success === undefined) {
    data.success = 1 - parseInt(data.error)
    delete data.error
  }
  return data || {}
}

export default (app: any) => {
  app.response.resolve = function (data: any, status = 200) {
    data = patchData(data)
    this.status(status).json({ ...data })
  }
  app.response.success = function (data: any, status = 200) {
    data = patchData(data)
    this.status(status).json({ ...data, success: 1 })
  }
  app.response.fail = function (data: any, status = 200) {
    data = patchData(data)
    this.status(status).json({ ...data, success: 0 })
  }
}
