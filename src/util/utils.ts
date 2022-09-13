export const formatCurrency = (numberFormat: number) => {
  return new Intl.NumberFormat('de-DE').format(numberFormat) + 'đ';
};

export const formatCurrencyVND = (numberFormat: number) => {
  if (numberFormat) {
    return new Intl.NumberFormat('de-DE').format(numberFormat) + ' VNĐ';
  }
};

export const formatDate = (date: Date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
  ].join('-');
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export const handleExportExcel = async (
  fileName: string,
  url: string,
  method: string,
  content?: any
) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const getToken = localStorage.getItem('token');
  await fetch(`${baseURL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken}`
    },
    body: JSON.stringify(content)
  })
    .then((res) => {
      if (res.status === 200) {
        return res.blob();
      } else {
        return res.json();
      }
    })
    .then((blob) => {
      if (blob.message) {
        return;
      }
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
};
