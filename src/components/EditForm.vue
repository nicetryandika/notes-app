<template>
    <div v-if="show" class="edit-form">
      <div class="overlay" @click="close"></div>
      <div class="modal">
        <h3>Edit Catatan</h3>
        <input v-model="editData.name" placeholder="Nama">
        <input v-model="editData.catatan" placeholder="Catatan">
        <input type="date" v-model="editData.tanggal">
        <button @click="saveEdit">Simpan</button>
        <button @click="close">Batal</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/usersStore';
  
  export default {
    props: {
      show: Boolean,
      userData: Object
    },
    setup(props, { emit }) {
      const store = useUserStore();
      const editData = ref({ ...props.userData });
  
      const saveEdit = () => {
        store.editUserNote(props.userData.id, { ...editData.value });
        close();
      };
  
      const close = () => {
        emit('close');
      };
  
      return { editData, saveEdit, close };
    }
  }
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
  
  .edit-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>

