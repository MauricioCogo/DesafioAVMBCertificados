<template>
    <div class="import">
        <div class="header">
            <h2>📤 Importar Alunos</h2>
            <p>Importe os dados dos alunos em formato JSON</p>
        </div>

        <div class="import-box">
            <div class="area-upload">
                <label for="file" class="btn-file">
                    📁 Escolher arquivo JSON
                </label>
                <input type="file" id="file" @change="handleFileUpload" accept=".json" style="display: none" />
                
                <div class="ou">ou</div>
                
                <textarea 
                    v-model="jsonInput" 
                    placeholder='Cole aqui o JSON no formato:
[
  {
    "name": "João Silva",
    "cpf": "12345678900",
    "courses": [
      {"id": 1, "name": "Curso de JavaScript"}
    ]
  }
]' 
                    rows="10">
                </textarea>
                
                <button @click="handleImport" :disabled="loading" class="btn-importar">
                    {{ loading ? '⏳ Importando...' : '🚀 Importar' }}
                </button>
            </div>

            <div v-if="error" class="message error">
                ⚠️ {{ error }}
            </div>
            
            <div v-if="success" class="message success">
                ✅ {{ success }}
            </div>

            <div v-if="hashes.length" class="hashes">
                <h3>📋 Hashes gerados:</h3>
                <ul>
                    <li v-for="item in hashes" :key="item.hash">
                        🔑 {{ item.hash }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { importStudents } from '../services/api';

const jsonInput = ref('');
const hashes = ref([]);
const loading = ref(false);
const error = ref('');
const success = ref('');

const handleImport = async () => {
    error.value = '';
    success.value = '';
    hashes.value = [];
    loading.value = true;

    try {
        const parsedJSON = JSON.parse(jsonInput.value);
        const resposta = await importStudents(parsedJSON);
        hashes.value = resposta.data;
        success.value = 'Importação concluída com sucesso!';
        jsonInput.value = '';
    } catch (e) {
        error.value = 'Falha na importação! Verifique se o JSON está correto.';
    } finally {
        loading.value = false;
    }
};

const handleFileUpload = (event) => {
    const arquivo = event.target.files[0];
    if (!arquivo) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        jsonInput.value = e.target.result;
    };
    reader.readAsText(arquivo);
};
</script>

<style scoped>
.import {
    max-width: 800px;
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

.import-box {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.area-upload {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.btn-file {
    background-color: #6c757d;
    color: white;
    padding: 0.75rem;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: background 0.3s;
    display: inline-block;
}

.btn-file:hover {
    background-color: #5a6268;
}

.ou {
    text-align: center;
    color: #999;
    font-size: 0.9rem;
}

textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.9rem;
    resize: vertical;
}

textarea:focus {
    outline: none;
    border-color: #2c5f2d;
}

.btn-importar {
    background-color: #2c5f2d;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.btn-importar:hover:not(:disabled) {
    background-color: #1e3a1e;
}

.btn-importar:disabled {
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

.message.success {
    background-color: #d4edda;
    color: #155724;
}

.hashes {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #dee2e6;
}

.hashes h3 {
    color: #2c5f2d;
    margin-bottom: 1rem;
}

.hashes ul {
    max-height: 300px;
    overflow-y: auto;
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
}

.hashes li {
    font-family: monospace;
    font-size: 0.85rem;
    padding: 0.25rem 0;
    word-break: break-all;
}
</style>