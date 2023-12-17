// https://zipcloud.ibsnet.co.jp/api/search?zipcode=160-0021
console.log('hello');

document.getElementById('button').addEventListener('click', addressData);
async function addressData() {
  const zipcodeItem = document.getElementById('text').value;
  const searchResult = document.getElementById('address');
  const errorTxt = document.getElementById('error');

  // 郵便番号が半角数字7桁であるかをチェック
  if (!/^\d{7}$/.test(zipcodeItem)) {
    errorTxt.textContent = '正しく入力してください';
    searchResult.textContent = '';
    return;
  }

  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcodeItem}`);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      // 郵便番号検索APIから都道府県・市区町村・町域名を取得
      const addressItem = data.results[0].address1 + data.results[0].address2 + data.results[0].address3;
      searchResult.textContent = addressItem;
      errorTxt.textContent = '';
    } else {
      errorTxt.textContent = '住所が見つかりませんでした';
      searchResult.textContent = '';
    }
  } catch (error) {
    // tryとセット？
    console.error('エラーが発生しました:', error);
    errorTxt.textContent = 'エラーが発生しました。';
    searchResult.textContent = '';
  }
}
