(function(){
  var header=document.querySelector('.site-header');
  var btn=document.querySelector('.menu-btn');
  var links=[].slice.call(document.querySelectorAll('.nav__list a'));

  // вибір теми (темна / цукрова вата)
  var root=document.documentElement;
  var themeBtns=[].slice.call(document.querySelectorAll('[data-set-theme]'));
  function syncTheme(){
    var cur=root.getAttribute('data-skin')||'dark';
    themeBtns.forEach(function(b){
      b.setAttribute('aria-pressed',String(b.getAttribute('data-set-theme')===cur));
    });
  }
  themeBtns.forEach(function(b){
    b.addEventListener('click',function(){
      var next=b.getAttribute('data-set-theme');
      if(next===root.getAttribute('data-skin'))return;
      root.classList.add('theme-anim');
      root.setAttribute('data-skin',next);
      try{localStorage.setItem('femboi-theme',next);}catch(e){}
      syncTheme();
      setTimeout(function(){root.classList.remove('theme-anim');},500);
    });
  });
  syncTheme();

  // мобільне меню
  function setMenu(open){
    header.classList.toggle('is-open',open);
    btn.setAttribute('aria-expanded',String(open));
  }
  btn.addEventListener('click',function(){setMenu(btn.getAttribute('aria-expanded')!=='true');});
  links.forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});

  // підсвічування поточного розділу в меню
  if('IntersectionObserver' in window){
    var map={};
    links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting)return;
        links.forEach(function(a){a.removeAttribute('aria-current');});
        var a=map[en.target.id];
        if(a)a.setAttribute('aria-current','true');
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){
      var s=document.getElementById(id);
      if(s)io.observe(s);
    });
  }

  // міфи та факти
  [].forEach.call(document.querySelectorAll('.myth'),function(m){
    var b=m.querySelector('.myth__btn');
    b.addEventListener('click',function(){
      var open=!m.classList.contains('is-open');
      m.classList.toggle('is-open',open);
      b.setAttribute('aria-expanded',String(open));
    });
  });
})();