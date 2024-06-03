/**
 * 下载文件
 * @param blob 二进制
 * @param fileName 文件名
 */
export const download = (blob: Blob | MediaSource, fileName: string) => {
  const el = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建 URL 对象

  el.href = href;
  el.target = '_blank';
  el.style.display = 'none';
  el.download = fileName;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

/**
 * 去除对象键值中string的前后空格
 * @param {object} obj 需要去除前后空格的对象
 * @returns {object} 返回一个去除空格后的新对象
 */
export const trimObject = <T = any>(obj: T) => {
  if (typeof obj !== 'object') {
    return obj;
  }
  const res: T = { ...obj };
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const item = obj[key];
      if (typeof item === 'string') {
        res[key] = item.trim() as T[Extract<keyof T, string>];
      }
    }
  }
  return res;
};

export async function downloadBinaryFile(
  url: string,
  fileName?: string,
  data?: any,
  method = 'GET',
): Promise<void> {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    let downFileName = fileName;
    if (!fileName) {
      try {
        // 尝试解析content-disposition 后端必须配置
        const contentDisp = response.headers.get('content-disposition');
        const fileNameArr = contentDisp?.split('filename=');
        if (fileNameArr && fileNameArr[1]) {
          fileNameArr[1] = fileNameArr[1].replace(/'|"/g, ''); // 替换火狐浏览器中，无法识别的包含空格文件名，把文本空格替换为编码空格
          fileNameArr[1] = fileNameArr[1].replace(' ', '%20');
          downFileName = decodeURIComponent(fileNameArr[1]);
        }
      } catch (error) {
        console.error(error);
        downFileName = Date.now().toString();
      }
    }

    const blob = await response.blob();
    const urlObject = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = urlObject;
    a.download = downFileName!;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(urlObject);
    console.log(`File downloaded: ${downFileName}`);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}
