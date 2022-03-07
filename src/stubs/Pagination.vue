<template>
  <div :style="{ display: 'flex', justifyContent: 'center', width: '100%' }">
    <a-pagination
      v-model="current"
      size="small"
      :total="total"
      :show-total="
        (total, range) => `${range[0]}-${range[1]} of ${total} items`
      "
      :page-size.sync="pageSize"
      @change="pageChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    total: { type: Number, required: true },
    pageChange: { type: Function, required: true },
  },
  data() {
    return {
      pageSize: 20,
      current: 1,
    };
  },
};
</script>
