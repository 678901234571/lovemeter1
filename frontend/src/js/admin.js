document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const resultsBody = document.getElementById('results-body');

  // Check auth status on load
  checkAuth();

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (data.authenticated) {
        showDashboard();
      } else {
        showLogin();
      }
    } catch (e) {
      showLogin();
    }
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        loginError.classList.add('hidden');
        showDashboard();
      } else {
        loginError.classList.remove('hidden');
      }
    } catch (error) {
      loginError.classList.remove('hidden');
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    showLogin();
  });

  function showLogin() {
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
  }

  function showDashboard() {
    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
    loadResults();
  }

  async function loadResults() {
    try {
      const res = await fetch('/api/admin/results');
      if (!res.ok) {
        if (res.status === 401) showLogin();
        return;
      }
      const results = await res.json();
      
      resultsBody.innerHTML = '';
      results.forEach(item => {
        const tr = document.createElement('tr');
        const date = new Date(item.createdAt).toLocaleString();
        tr.innerHTML = `
          <td>${date}</td>
          <td>${item.boyName}</td>
          <td>${item.girlName}</td>
          <td>${item.score}%</td>
          <td>${item.message}</td>
        `;
        resultsBody.appendChild(tr);
      });
    } catch (error) {
      console.error('Failed to load results', error);
    }
  }
});
