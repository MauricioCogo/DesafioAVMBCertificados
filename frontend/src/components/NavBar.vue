<template>
    <nav class="navbar">
        <h1>🎓 AVMB Certificados</h1>
        <div class="links">
            <router-link to="/dashboard">📊 Dashboard</router-link>
            <router-link to="/import">📤 Importar Alunos</router-link>
            <router-link to="/validate">🔍 Validar Certificado</router-link>
            <button @click="logout">🚪 Sair</button>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
};
</script>

<style scoped>
.navbar {
    background-color: #2c5f2d;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar h1 {
    margin: 0;
    font-size: 1.5rem;
}

.links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.links a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background 0.3s;
}

.links a:hover {
    background-color: #1e3a1e;
}

.links button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.links button:hover {
    background-color: #c82333;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .links {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>