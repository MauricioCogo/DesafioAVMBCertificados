<template>
  <div class="student-block">
    <div class="header">
      <div>
        <strong>{{ student.name }}</strong>
        <div class="cpf">{{ student.cpf }}</div>
      </div>
      <button @click="$emit('cancel', student.id)" class="cancel-btn">X</button>
    </div>

    <ul class="courses">
      <li v-for="c in student.courses" :key="c.id">
        <span class="course-name">{{ c.name }}</span>
        <span :class="['badge', statusClass(c.student_courses?.status)]">
          {{ c.student_courses?.status || 'N/A' }}
        </span>
        <a v-if="c.student_courses?.hash"
           :href="downloadCertificate(c.student_courses.hash)"
           target="_blank"
           class="xml-link">XML</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { downloadCertificate } from '../services/api';

const props = defineProps({ student: Object });
const emit = defineEmits(['cancel']);

const statusClass = (status) => {
  if (!status) return 'none';
  return status.toLowerCase();
};
</script>

<style>
.student-block {
  width: 240px;
  min-height: 180px;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #f9f9f9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cpf {
  font-size: 0.8rem;
  color: #555;
}

.courses {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.courses li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  font-size: 0.85rem;
}

.badge {
  padding: 2px 6px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.badge.em_andamento { background: #fdd835; color: #333; }
.badge.concluido { background: #43a047; color: white; }
.badge.cancelado { background: #e53935; color: white; }
.badge.none { background: #ccc; color: #333; }

.cancel-btn {
  background: transparent;
  border: none;
  color: #e53935;
  font-weight: bold;
  cursor: pointer;
}

.xml-link {
  margin-left: 5px;
  font-size: 0.75rem;
  text-decoration: none;
  color: #1e88e5;
}

.xml-link:hover {
  text-decoration: underline;
}
</style>