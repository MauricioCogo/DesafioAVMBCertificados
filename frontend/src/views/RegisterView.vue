<template>
    <div class="register">
        <div class="register-box">
            <div class="logo">
                📝
            </div>
            <h2>Criar Conta</h2>
            <p>Registre sua instituição de ensino</p>

            <div class="form">
                <input 
                    v-model="nome" 
                    type="text"
                    placeholder="Nome da instituição"
                />
                <input 
                    v-model="email" 
                    type="email"
                    placeholder="Email"
                />
                <input 
                    v-model="senha" 
                    type="password"
                    placeholder="Senha"
                />
                <input 
                    v-model="confirmarSenha" 
                    type="password"
                    placeholder="Confirmar senha"
                />
                <button @click="handleRegister" :disabled="loading">
                    {{ loading ? '⏳ Registrando...' : '✅ Registrar' }}
                </button>
            </div>

            <div v-if="error" class="error">
                ⚠️ {{ error }}
            </div>
            
            <div v-if="success" class="success">
                ✅ {{ success }}
            </div>

            <div class="login-link">
                <p>Já tem conta? <router-link to="/">Faça login</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/api';

const nome = ref('');
const email = ref('');
const senha = ref('');
const confirmarSenha = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);

const router = useRouter();

const handleRegister = async () => {
    error.value = '';
    success.value = '';

    if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
        error.value = 'Preencha todos os campos.';
        return;
    }
    
    if (senha.value !== confirmarSenha.value) {
        error.value = 'As senhas não coincidem.';
        return;
    }

    if (senha.value.length < 6) {
        error.value = 'A senha deve ter pelo menos 6 caracteres.';
        return;
    }

    loading.value = true;

    try {
        await register({
            name: nome.value,
            email: email.value,
            password: senha.value
        });

        success.value = 'Instituição registrada com sucesso! Redirecionando...';
        
        setTimeout(() => {
            router.push('/');
        }, 2000);
    } catch (e) {
        if (e.response?.data?.errors) {
            error.value = e.response.data.errors.map(err => err.motivo).join(', ');
        } else {
            error.value = 'Erro ao registrar instituição. Verifique os dados.';
        }
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.register {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2c5f2d 0%, #1e3a1e 100%);
    padding: 1rem;
}

.register-box {
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

.register-box h2 {
    color: #2c5f2d;
    margin-bottom: 0.5rem;
}

.register-box p {
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

.success {
    background-color: #d4edda;
    color: #155724;
    padding: 0.75rem;
    border-radius: 8px;
    margin-top: 1rem;
}

.login-link {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #dee2e6;
}

.login-link a {
    color: #2c5f2d;
    text-decoration: none;
    font-weight: 600;
}

.login-link a:hover {
    text-decoration: underline;
}
</style>