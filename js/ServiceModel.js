/**
 * @param data type json || FormData
 * @param onSuccess type function
 * @param onError type function
 * @param onFinally type function
 */

const plazaService = {
  api_url: 'https://myapi.com/',
  save({data, onSuccess, onError, onFinally}){

    let fm;

    if(data instanceof FormData){
      fm = data;
    }else{
      fm = new FormData();
      for (const key in data) {
        fm.append(key, data[key]);
      }
    }
    
    fetch(this.api_url+'/save', {method: 'POST', body: fm})
    .then(res => res.json())
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally)
  }
}