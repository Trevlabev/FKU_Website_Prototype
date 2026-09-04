const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.getElementById('mobile-menu');
menuButton?.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!open));
  mobileMenu.hidden=open;
});
document.querySelectorAll('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false')}));

document.querySelectorAll('[data-scroll]').forEach(el=>el.addEventListener('click',()=>document.querySelector(el.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

const toast=document.getElementById('toast'); let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
document.querySelectorAll('[data-toast]').forEach(el=>el.addEventListener('click',()=>showToast(el.dataset.toast)));

const joinForm=document.getElementById('join-form');
joinForm?.addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('email');document.getElementById('form-note').textContent=`WELCOME, ${email.value.toUpperCase()}. Demo only — no data was sent.`;showToast('FOUNDING MEMBER STATUS: PENDING');joinForm.reset()});

const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.12});reveals.forEach(el=>io.observe(el))}else reveals.forEach(el=>el.classList.add('visible'));

const player=document.querySelector('.fake-player');const playerTitle=document.getElementById('player-title');const progress=document.getElementById('player-progress');const playerTime=document.getElementById('player-time');let timer=null;let current=null;
const names={'01':'LATE FEE — WAYNE / FKU RADIO','02':'CONTINUE? — WAYNE / FKU ARCADE','03':'DRIVE THRU AT 1:13 — WAYNE / AFTER HOURS'};
document.querySelectorAll('.track').forEach(track=>track.addEventListener('click',()=>{
  if(current===track){clearInterval(timer);timer=null;track.classList.remove('active');track.querySelector('.track-play').textContent='▶';player.classList.remove('playing');current=null;return}
  if(current){current.classList.remove('active');current.querySelector('.track-play').textContent='▶'} clearInterval(timer);
  current=track;track.classList.add('active');track.querySelector('.track-play').textContent='❚❚';player.classList.add('playing');playerTitle.textContent=names[track.dataset.track];let p=0;progress.style.width='0';playerTime.textContent='00:00';
  timer=setInterval(()=>{p=(p+1)%101;progress.style.width=p+'%';const sec=Math.floor(p*1.15);playerTime.textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`},170)
}));
