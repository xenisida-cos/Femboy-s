/* Тема: за замовчуванням темна; вибір користувача запам'ятовується */
(function(){
  var r=document.documentElement,t='dark';
  r.classList.add('js');
  try{var v=localStorage.getItem('femboi-theme');if(v==='cotton'||v==='dark')t=v;}catch(e){}
  r.setAttribute('data-skin',t);
})();