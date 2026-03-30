<template>
    <div class="validate">
        <div class="header">
            <h2>🔍 Validar Certificado</h2>
            <p>Consulte a autenticidade de um certificado pelo hash</p>
        </div>

        <div class="validate-box">
            <div class="search-area">
                <input 
                    v-model="hash" 
                    type="text"
                    placeholder="Digite o hash do certificado aqui..."
                    @keyup.enter="handleValidate"
                />
                <button @click="handleValidate" :disabled="loading">
                    {{ loading ? '🔍 Buscando...' : '🔍 Buscar' }}
                </button>
            </div>

            <div v-if="error" class="message error">
                ⚠️ {{ error }}
            </div>

            <div v-if="certificate" class="certificate-card">
                <div class="cert-header">
                    <span class="icon">📜</span>
                    <h3>Certificado Válido</h3>
                </div>
                
                <div class="info-group">
                    <label>👨‍🎓 Aluno:</label>
                    <p>{{ certificate.aluno }}</p>
                </div>
                
                <div class="info-group">
                    <label>🆔 CPF:</label>
                    <p>{{ formatarCPF(certificate.cpf) }}</p>
                </div>
                
                <div class="info-group">
                    <label>📚 Curso:</label>
                    <p>{{ certificate.curso }}</p>
                </div>
                
                <div class="info-group">
                    <label>📊 Status:</label>
                    <p :class="'status-' + certificate.status.toLowerCase()">
                        {{ formatarStatus(certificate.status) }}
                    </p>
                </div>
                
                <a :href="certificate.download_url" target="_blank" class="btn-download">
                    📥 Baixar Certificado
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { validateCertificate } from '../services/api';

const hash = ref('');
const certificate = ref(null);
const loading = ref(false);
const error = ref('');

const handleValidate = async () => {
    if (!hash.value.trim()) {
        error.value = 'Digite um hash para consultar';
        return;
    }
    
    error.value = '';
    certificate.value = null;
    loading.value = true;

    try {
        const resposta = await validateCertificate(hash.value);
        certificate.value = resposta.data;
    } catch (e) {
        error.value = 'Hash não encontrado! Verifique se o código está correto.';
    } finally {
        loading.value = false;
    }
};

const formatarStatus = (status) => {
    if (!status) return 'N/A';
    if (status === 'EM_ANDAMENTO') return 'Em Andamento';
    if (status === 'CONCLUIDO') return 'Concluído';
    if (status === 'CANCELADO') return 'Cancelado';
    return status;
};

const formatarCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};
</script>

<style scoped>
.validate {
    max-width: 700px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.header h2 {
    color: #2c5f2d;
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.header p {
    color: #666;
}

.validate-box {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-area {
    display: flex;
    gap: 1rem;
}

.search-area input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
}

.search-area input:focus {
    outline: none;
    border-color: #2c5f2d;
}

.search-area button {
    background-color: #2c5f2d;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.search-area button:hover:not(:disabled) {
    background-color: #1e3a1e;
}

.search-area button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.message {
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
}

.message.error {
    background-color: #f8d7da;
    color: #721c24;
}

.certificate-card {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 12px;
    border-left: 4px solid #28a745;
}

.cert-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #dee2e6;
}

.cert-header .icon {
    font-size: 2rem;
}

.cert-header h3 {
    color: #28a745;
    margin: 0;
}

.info-group {
    margin-bottom: 1rem;
}

.info-group label {
    display: block;
    font-weight: 600;
    color: #666;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
}

.info-group p {
    margin: 0;
    font-size: 1rem;
    color: #333;
}

.status-em_andamento {
    color: #856404;
    font-weight: 600;
}

.status-concluido {
    color: #155724;
    font-weight: 600;
}

.status-cancelado {
    color: #721c24;
    font-weight: 600;
}

.btn-download {
    display: inline-block;
    margin-top: 1rem;
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 8px;
    text-align: center;
    transition: background 0.3s;
}

.btn-download:hover {
    background-color: #0056b3;
}
</style>