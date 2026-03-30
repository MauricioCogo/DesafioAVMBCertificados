<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        🎓
      </div>
      <h2>AVMB Certificados</h2>
      <p>Faça login para acessar o sistema</p>

      <div class="form">
        <input 
          v-model="email" 
          type="email"
          placeholder="Seu email"
          @keyup.enter="handleLogin"
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Sua senha"
          @keyup.enter="handleLogin"
        />
        <button @click="handleLogin" :disabled="loading">
          {{ loading ? '⏳ Carregando...' : ' Entrar' }}
        </button>
      </div>

      <div v-if="error" class="error">
        ⚠️ {{ error }}
      </div>

      <div class="register-link">
        <p>Não tem conta? <router-link to="/register">Registrar Instituição</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../services/api';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Preencha email e senha';
    return;
  }

  error.value = '';
  loading.value = true;

  try {
    const res = await login({
      email: email.value,
      password: password.value
    });
    
    localStorage.setItem('token', res.token);
    router.push('/dashboard');
  } catch (e) {
    error.value = 'Email ou senha incorretos!';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2c5f2d 0%, #1e3a1e 100%);
  padding: 1rem;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.login-box h2 {
  color: #2c5f2d;
  margin-bottom: 0.5rem;
}

.login-box p {
  color: #666;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form input:focus {
  outline: none;
  border-color: #2c5f2d;
}

.form button {
  background-color: #2c5f2d;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.form button:hover:not(:disabled) {
  background-color: #1e3a1e;
}

.form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.register-link {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.register-link a {
  color: #2c5f2d;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>