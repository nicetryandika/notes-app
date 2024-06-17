<script>
import {useUserStore} from './stores/usersStore'
import { ref } from 'vue';

export default {
  setup(){
    const noteUsers = useUserStore()
    let nama = ref('');
    let catatan = ref('');
    let tanggal = ref('');
    const showEditForm = ref(false);
    const editData = ref({ id: null, nama: '', catatan: '', tanggal: '' });

    const addUserNote = () => {
      noteUsers.addUserNote({ nama: nama.value, catatan: catatan.value, tanggal: tanggal.value });
      clearForm();
    };

    const clearForm = () => {
      nama.value = '';
      catatan.value = '';
      tanggal.value = '';
    };

    const removeUserNote = (id) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
        noteUsers.removeUserNote(id);
        window.alert("Catatan telah dihapus.");
      }
    };

    const handleEdit = () => {
      if (window.confirm("Apakah Anda yakin ingin menyimpan perubahan ini?")) {
        noteUsers.editUserNote(editData.value.id, {
          nama: editData.value.nama,
          catatan: editData.value.catatan,
          tanggal: editData.value.tanggal
        });
        showEditForm.value = false;
        window.alert("Perubahan telah disimpan.");
      }
    };

    return {noteUsers, nama, catatan, tanggal, addUserNote, removeUserNote, showEditForm, editData, handleEdit}
  },
}

</script>
<template>
  <div class="container">
    <div class="title">
            <h1>Mengelola Catatan Pengguna</h1>
    </div>
    <form class="formAdd" @submit.prevent="addUserNote">
          <div class="titleForm">
              <small>
                  Tambah Catatan 
              </small>
          </div>
          <div class="nama">
              <label for="nama">Nama</label>
              <input type="text" v-model="nama" placeholder="masukkan nama" autocomplete="off" required>
          </div>
          <div class="catatan">
              <label for="catatan">catatan</label>
              <input type="text"  v-model="catatan" placeholder="masukkan catatan" autocomplete="off">
          </div>
          <div class="tanggal">
              <label for="tanggal">tanggal</label>
              <input type="date" v-model="tanggal" placeholder="masukkan tanggal" pattern="(0)8[1-9][0-9]{6,9}$" required autocomplete="off">
          </div>
          <div class="button">
              <button type="submit" value="add">Tambah</button>
          </div>
    </form>

    <div v-if="showEditForm" class="edit-data">
      <form @submit.prevent="handleEdit" class="formAdd">
        <div class="title">
          <p>Edit Data</p>
        </div>
        <div class="nama">
          <label for="">Nama</label>
          <input v-model="editData.nama" placeholder="Nama">
        </div>
        <div class="catatan">
          <label for="">Catatan</label>
          <input v-model="editData.catatan" placeholder="Catatan">
        </div>
        <div class="tanggal">
          <label for="">tanggal</label>
          <input v-model="editData.tanggal" type="date" placeholder="Tanggal">
        </div>
        <div class="submit">
          <button type="submit">Simpan Perubahan</button>
          <button @click="showEditForm = false">Batal</button>
        </div>
      </form>
    </div>

    <table>
    <thead>
      <tr>
        <th>name</th>
        <th>Catatan</th>
        <th>tanggal</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="users in noteUsers.userNotes" :key="users.id">
         <td>{{ users.name }}</td>
         <td>{{ users.catatan }}</td>
         <td>{{ users.tanggal }}</td>
         <td>
          <button @click="removeUserNote(users.id)">Delete</button>
          <button @click="editData.id = users.id; editData.nama = users.name; editData.catatan = users.catatan; editData.tanggal = users.tanggal; showEditForm = true">Edit</button>
         </td>
      </tr>
    </tbody>
  </table>
  </div> 
</template>

<style scoped>
  .edit-data form div.title {
    text-decoration: underline;
  }

  div.title {
    border-bottom: 2px solid #FFC94A;
    margin-bottom: 10px;
    color: #FFC94A;
  }
  .edit-data form div.submit {
    margin-top: 8px;
    gap: 20px;
  }
  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      text-decoration: none;
  }

  div.container{
      position: absolute; /* Changed from relative to absolute */
      top: 50%; /* Center vertically */
      left: 50%; /* Center horizontally */
      transform: translate(-50%, -50%); /* Adjust position to be exactly in the center */
      background-color: rgb(245, 245, 245);
      border-radius: 10px;
      width: 800px;
      margin: 15px auto;
      box-shadow: 8px 12px 33px -3px rgba(0,0,0,0.4);
      -webkit-box-shadow: 8px 12px 33px -3px rgba(0,0,0,0.4);
      -moz-box-shadow: 8px 12px 33px -3px rgba(0,0,0,0.4);
      padding: 30px 70px;
      font-family: poppins, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  table {
    margin-top: 5px;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
  }

  th, td {padding: 5px;}

  td {
  color: rgba(58, 58, 58, 0.961);
  }
  th { color: white;}

  thead tr {
      background-color: #FFC94A;
  }

  tbody tr:nth-child(even) {
      background-color: #FFC94A;
  }
  
  tbody tr:nth-child(odd) {
      background-color: #f7f6bbb3;
  }

  tr:last-child{
      border-bottom: 1px solid #FFC94A;
  }

  form.formAdd {
    margin: 15px 0px;
    align-self: start;
    background-color: #f7f6bbe1;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: rgba(58, 58, 58, 0.961);
    width: 320px;
}

  form div {
      display: flex;
  }

  div.titleForm {
      margin-bottom: 5px;
      text-align: center;
      justify-content: center;
  }

  div.nama, div.catatan, div.tanggal {
      gap: 15px;
      justify-content: space-between;
      font-size: 14px;
      align-items: center;
      flex-wrap: wrap;
  }


  div.tanggal div {
      display: flex;
      flex-direction: column;
  }
  form div input[type= date] {
    width: 61%;
  }
  form div input {
      padding: 6.5px;
      border: 0;
      border-radius: 5px;
      background-color: #ffffee;
  }

  form div.button {
      margin-top: 10px;
      justify-content: center;
  }

  form div button {
      border: 0;
      width: 100%;
      padding: 5px;
      color: rgba(58, 58, 58, 0.961);
      background-color: #FFC94A;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      cursor: pointer;
  }

  form div button:hover {
      background-color: #ffbe25;
  }
</style>
