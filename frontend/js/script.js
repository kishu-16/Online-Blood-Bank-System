// Global helpers: auth headers, loader, toast, modal control, page animations

const API_BASE = 'http://localhost:8080/api';

function authHeaders(){
  const token = localStorage.getItem('bb_token');
  return token ? {'Authorization':'Bearer '+token} : {};
}

function showLoader(){
  if (document.getElementById('globalLoader')) return;
  const loader = document.createElement('div');
  loader.id = 'globalLoader';
  loader.style.position='fixed';
  loader.style.left='50%'; loader.style.top='50%';
  loader.style.transform='translate(-50%,-50%)';
  loader.style.zIndex='9999';
  loader.innerHTML = `<div class="loader" style="border-top:6px solid var(--accent)"></div>`;
  document.body.appendChild(loader);
}
function hideLoader(){ const el = document.getElementById('globalLoader'); if (el) el.remove(); }

function showToast(msg, isErr=false){
  const t = document.createElement('div'); t.className='toast'; t.textContent = msg;
  if (isErr) t.style.background = 'linear-gradient(90deg,#ff003c,#ff6b6b)';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 3000);
}

function openEmergency(){ document.getElementById('emergencyModal').classList.remove('hidden'); }
function closeEmergency(){ document.getElementById('emergencyModal').classList.add('hidden'); }

// Quick init on pages
document.addEventListener('DOMContentLoaded', () => {
  // page fade in
  document.body.style.opacity = 0;
  setTimeout(()=> { document.body.style.transition='opacity 600ms ease'; document.body.style.opacity=1; }, 80);

  // mobile nav toggle
  document.querySelectorAll('.mobile-menu').forEach(b=>{
    b.addEventListener('click', ()=>{
      const nav = document.querySelector('.nav'); if (!nav) return;
      nav.style.display = (nav.style.display==='block') ? 'none' : 'block';
    });
  });

  // emergency modal
  const em = document.getElementById('emergencyBtn'); if (em) em.addEventListener('click', (ev)=>{ ev.preventDefault(); openEmergency(); });

  // ripple effect for buttons
  document.querySelectorAll('button, a.btn').forEach(btn => {
    btn.style.position = 'relative';
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left - 40) + 'px';
      ripple.style.top = (e.clientY - rect.top - 40) + 'px';
      ripple.style.width = ripple.style.height = '80px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.12)';
      ripple.style.transform = 'scale(0)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transition = 'transform .6s ease, opacity .6s ease';
      this.appendChild(ripple);
      setTimeout(()=> { ripple.style.transform='scale(4)'; ripple.style.opacity='0'; }, 10);
      setTimeout(()=> ripple.remove(), 700);
    });
  });

  // mini dashboard in index
  const mini = document.getElementById('mini-dashboard');
  if (mini){
    const groups = ['A+','B+','O+','AB+'];
    groups.forEach(g=>{
      const el = document.createElement('div'); el.className='mini-bag';
      el.innerHTML = `<strong>${g}</strong><div class="mini-fill" data-group="${g}" style="height:40%"></div>`;
      mini.appendChild(el);
    });
    // animate demo
    setInterval(()=>{
      document.querySelectorAll('.mini-fill').forEach(f=> f.style.height = (20 + Math.floor(Math.random()*80)) + '%');
    },4000);
  }

  // dashboard bag animation (if present)
  document.querySelectorAll('.blood-card .fill').forEach(f=>{
    const h = f.style.height || '0%';
    f.style.height = '0%';
    setTimeout(()=> f.style.height = h, 120);
  });
});

// small helper for auth headers used in fetch calls inline
window.authHeaders = authHeaders;
window.showLoader = showLoader;
window.hideLoader = hideLoader;
window.showToast = showToast;
window.openEmergency = openEmergency;
window.closeEmergency = closeEmergency;
