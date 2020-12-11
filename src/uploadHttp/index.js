import axios from '@/config/http'
// import store from 'store'

function getError(action, option, xhr) {
  let msg
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to post ${action} ${xhr.status}`
  }

  const err = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}

/* function getBody (xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
} */

// 文件大小的最大限制（单位MB，1024换算）
const MAX_FILE_LIMIT_MB = 10;
const MAX_FILE_SIZE = MAX_FILE_LIMIT_MB * 1024 * 1024

//原接口有 hasDirectory = false
export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return false
  }
  if (MAX_FILE_SIZE < option.file.size) {
    option.onError(`文件大小超出${MAX_FILE_LIMIT_MB}M`);
    return Promise.resolve();
  }

  const xhr = axios // new XMLHttpRequest()
  const { action } = option

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key])
    })
  }
  formData.append(option.filename, option.file, option.file.name)
  // if (hasDirectory) {
  //   formData.append('Directory', 'vr目录')
  // }
  xhr.POST(action, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'token': store.state.TOKEN,
    },
  }).then((res) => {
    if (res.code === 0 || res.code === 200) {
      // const data = res.data.data
      // data.path = data.url
      // data.fileName = data.url
      option.onSuccess(res)
    } else {
      option.onError(res)
    }
  }).catch((res) => {
    console.log(res)
    option.onError(getError(action, option, xhr))
  })
  /*   xhr.onerror = function error (e) {
    option.onError(e)
  }

  xhr.onload = function onload () {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr))
    }

    option.onSuccess(getBody(xhr))
  }

  xhr.open('post', action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  xhr.send(formData) */
  return xhr
}
