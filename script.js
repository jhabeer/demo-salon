(function(){
  var WA='https://wa.me/2348163325675?text=';
  document.documentElement.classList.add('js');
  function link(m){return WA+encodeURIComponent(m)}
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href=link(a.getAttribute('data-wa'))});
  var S=[
   ['Hair',[['Wash & Blow-dry',8000],['Silk Press',18000],['Knotless Braids (from)',35000],['Wig Install & Styling',20000],['Natural Hair Treatment',15000],['Loc Retwist',12000]]],
   ['Nails',[['Classic Manicure',6000],['Gel Polish',10000],['Acrylic Full Set',18000],['Pedicure',9000],['Nail Art (from)',5000]]],
   ['Makeup',[['Soft Glam',25000],['Bridal Makeup (from)',80000],['Gele & Makeup Combo',45000],['Makeup Lesson',40000]]],
   ['Skin & Lash',[['Signature Facial',22000],['Lash Extensions',15000],['Brow Shaping & Tint',7000]]]
  ];
  function money(n){return '₦'+n.toLocaleString('en-NG')}
  function esc(s){return s.replace(/&/g,'&amp;')}
  var grid=document.getElementById('priceGrid'),sel=document.getElementById('fService');
  S.forEach(function(c){
    var h='<div class="pcard reveal"><h3>'+esc(c[0])+'<small>'+c[1].length+' services</small></h3>';
    var og=document.createElement('optgroup');og.label=c[0];
    c[1].forEach(function(s){
      var m='Hi Jab Studio, I saw the salon & boutique demo (Aurelle Beauty House) and tried booking "'+s[0]+'" ('+money(s[1])+'). I want a site like this with WhatsApp booking.';
      h+='<a class="prow" target="_blank" rel="noopener" href="'+link(m)+'"><span class="n">'+esc(s[0])+'</span><span class="dots"></span><span class="p">'+money(s[1])+'</span><span class="bk">Book →</span></a>';
      var o=document.createElement('option');o.textContent=s[0]+' — '+money(s[1]);o.value=s[0];og.appendChild(o);
    });
    grid.insertAdjacentHTML('beforeend',h+'</div>');sel.appendChild(og);
  });
  // days
  var fd=document.getElementById('fDay');
  var fmt=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',weekday:'long',day:'numeric',month:'short'});
  for(var i=1;i<=8;i++){var d=new Date(Date.now()+i*864e5);var o=document.createElement('option');o.textContent=fmt.format(d);fd.appendChild(o)}
  document.getElementById('bookForm').addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('fName').value.trim()||'a client';
    var m='Hi Jab Studio, I saw the salon & boutique demo (Aurelle Beauty House). Demo booking from '+n+': "'+sel.value+'" on '+fd.value+' at '+document.getElementById('fTime').value+'. I want a site like this with WhatsApp booking.';
    window.open(link(m),'_blank','noopener');
  });
  // hours
  var hrs={0:[12,18],1:null,2:[9,19],3:[9,19],4:[9,20],5:[9,20],6:[8,20]};
  var p=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),o={};
  p.forEach(function(x){o[x.type]=x.value});
  var day={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday],t=(+o.hour%24)+(+o.minute)/60,h=hrs[day];
  var open=!!h&&t>=h[0]&&t<h[1],pill=document.getElementById('pill');
  pill.textContent=open?'Open now':'Closed now';pill.classList.toggle('closed',!open);
  var r=document.querySelector('tr[data-d="'+day+'"]');if(r)r.classList.add('today');
  // nav
  var nav=document.querySelector('.nav');
  function sc(){nav.classList.toggle('solid',scrollY>30)}sc();addEventListener('scroll',sc,{passive:true});
  nav.querySelector('.burger').onclick=function(){var x=nav.classList.toggle('open');this.setAttribute('aria-expanded',x)};
  nav.querySelectorAll('.links a').forEach(function(a){a.onclick=function(){nav.classList.remove('open')}});
  // reveal
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}
  else els.forEach(function(el){el.classList.add('in')});
})();
