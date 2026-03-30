<template>
  <div class="dashboard">
    <div class="header">
      <h2>📊 Dashboard</h2>
      <p>Bem-vindo! Aqui você gerencia todos os alunos</p>
    </div>

    <div class="cards">
      <div class="card card-total">
        <h3>👨‍🎓 Total</h3>
        <p class="number">{{ students.length }}</p>
        <span>Alunos cadastrados</span>
      </div>

      <div class="card card-progress">
        <h3>⏳ Em Andamento</h3>
        <p class="number">{{ inProgressCount }}</p>
        <span>Cursos em andamento</span>
      </div>

      <div class="card card-completed">
        <h3>✅ Concluídos</h3>
        <p class="number">{{ completedCount }}</p>
        <span>Cursos finalizados</span>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>⏰ Carregando alunos...</p>
    </div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Cursos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in students" :key="aluno.id">
            <td><strong>{{ aluno.name }}</strong></td>
            <td>{{ formatarCPF(aluno.cpf) }}</td>
            <td>
              <div v-for="curso in aluno.courses" :key="curso.id" class="curso-item">
                {{ curso.name }}
                <a v-if="curso.student_courses?.hash" 
                   :href="downloadCertificate(curso.student_courses.hash)" 
                   target="_blank"
                   class="link-xml">
                  📄 XML
                </a>
              </div>
            </td>
            <td>
              <div v-for="curso in aluno.courses" :key="curso.id">
                <span :class="'status status-' + statusClass(curso.student_courses?.status)">
                  {{ formatarStatus(curso.student_courses?.status) }}
                </span>
              </div>
            </td>
            <td>
              <button @click="cancelarAluno(aluno.id)" class="btn-cancelar">
                ❌ Cancelar
              </button>
            </td>
          </tr>
          <tr v-if="students.length === 0">
            <td colspan="5" class="empty">Nenhum aluno cadastrado</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="error" class="error">
      ⚠️ {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getStudents, cancelStudent, downloadCertificate } from '../services/api';

const students = ref([]);
const loading = ref(false);
const error = ref('');

const carregarAlunos = async () => {
  loading.value = true;
  error.value = '';
  try {
    const resposta = await getStudents();
    students.value = resposta.data.map(aluno => ({ ...aluno, courses: aluno.courses || [] }));
  } catch (erro) {
    error.value = 'Erro ao carregar alunos';
  } finally {
    loading.value = false;
  }
};

const cancelarAluno = async (id) => {
  if (!confirm('Tem certeza que deseja cancelar este aluno?')) return;
  try {
    await cancelStudent(id);
    await carregarAlunos();
    alert('Aluno cancelado com sucesso!');
  } catch (erro) {
    alert('Erro ao cancelar aluno');
  }
};

const completedCount = computed(() =>
  students.value.filter(aluno =>
    aluno.courses?.some(curso => curso.student_courses?.status === 'CONCLUIDO')
  ).length
);

const inProgressCount = computed(() =>
  students.value.filter(aluno =>
    aluno.courses?.some(curso => curso.student_courses?.status === 'EM_ANDAMENTO')
  ).length
);

const statusClass = (status) => {
  if (!status) return 'none';
  return status.toLowerCase();
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

onMounted(() => carregarAlunos());
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-total {
  border-top: 4px solid #2c5f2d;
}

.card-progress {
  border-top: 4px solid #ffc107;
}

.card-completed {
  border-top: 4px solid #28a745;
}

.card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.number {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #2c5f2d;
}

.card-progress .number {
  color: #ffc107;
}

.card-completed .number {
  color: #28a745;
}

.card span {
  color: #666;
  font-size: 0.9rem;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2c5f2d;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  vertical-align: top;
}

tr:hover {
  background-color: #f8f9fa;
}

.curso-item {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.link-xml {
  color: #007bff;
  text-decoration: none;
  font-size: 0.85rem;
}

.link-xml:hover {
  text-decoration: underline;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.status-em_andamento {
  background-color: #fff3cd;
  color: #856404;
}

.status-concluido {
  background-color: #d4edda;
  color: #155724;
}

.status-cancelado {
  background-color: #f8d7da;
  color: #721c24;
}

.status-none {
  background-color: #e2e3e5;
  color: #383d41;
}

.btn-cancelar {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.btn-cancelar:hover {
  background-color: #c82333;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
}

.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
  }
  
  th, td {
    padding: 0.75rem;
  }
}
</style>