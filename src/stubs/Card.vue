<template>
  <a-card hoverable :title="data.name" :style="{ marginBottom: '20px' }">
    <p>{{ data.description }}</p>
    <template #actions>
      <a-popconfirm
        title="Are you sure delete this Item?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="deleteList(data.id)"
      >
        <a-icon type="delete" />
      </a-popconfirm>
    </template>
  </a-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: { data: Object, required: true },

  methods: {
    ...mapActions(['deleteList']),
  },
};
</script>
