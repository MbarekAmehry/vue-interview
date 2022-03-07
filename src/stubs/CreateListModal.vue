<template>
  <div>
    <a-button
      :style="{ marginBottom: '40px' }"
      type="link"
      @click="onOpenModal"
    >
      My Lists
      <a-icon type="plus" />
    </a-button>

    <a-modal
      :visible="isModalVisible"
      title="Create list"
      okText="Create"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="createForm"
        :rules="rules"
        :model="list"
        layout="vertical"
      >
        <a-form-model-item ref="name" label="Title" prop="name">
          <a-input
            v-model="list.name"
            type="text"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="Description" prop="description">
          <a-input v-model="list.description" type="text" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      ModalText: 'Content of the modal',
      isModalVisible: false,
      account_id: '',
      list: {
        name: '',
        description: '',
      },
      rules: {
        name: [
          {
            required: true,
            max: 255,
            pattern: /^[a-zA-Z0-9 ]+$/,
            message: 'Should be a combination of nummbers & alphabets',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            max: 1000,
            trigger: 'blur',
          },
        ],
      },
    };
  },

  methods: {
    ...mapActions(['createList', 'fetchLists']),

    onOpenModal() {
      this.isModalVisible = true;
    },
    handleSubmit() {
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          console.info('success');
          this.createList(this.list).then((result) => {
            this.$notification['success']({
              message: 'Create List',
              description: 'The list was created successfully',
            });
            this.isModalVisible = false;
            this.fetchLists();
          });
        } else {
          this.$notification['error']({
            message: 'Create List',
            description: 'Oops something went wrong!',
          });
        }
      });
    },
    handleCancel() {
      this.isModalVisible = false;
    },
  },
};
</script>
