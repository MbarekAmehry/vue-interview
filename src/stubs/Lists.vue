<template>
  <a-layout-content :style="{ padding: '0 50px', marginBottom: '50px' }">
    <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
      <CreateListModal />

      <div :style="{ marginBottom: '30px' }" class="gutter-example">
        <a-spin :spinning="loading">
          <a-row :gutter="16" v-if="lists">
            <template v-for="item in lists">
              <a-col :key="item.id" class="gutter-row" :span="6" :offset="1">
                <div class="gutter-box">
                  <Card :data="item" />
                </div>
              </a-col>
            </template>
          </a-row>
          <p v-else>{{ error }}</p>
        </a-spin>
      </div>

      <Pagination v-if="total > 20" :pageChange="getData" :total="total" />
    </div>
  </a-layout-content>
</template>

<script>
import { mapActions } from 'vuex';

import Card from './Card.vue';
import Pagination from './Pagination.vue';
import CreateListModal from '../stubs/CreateListModal.vue';

export default {
  name: 'Lists',
  components: {
    Card,
    Pagination,
    CreateListModal,
  },
  data() {
    return {
      error: null,
      loading: false,
      lists: null,
      total: null,
    };
  },

  methods: {
    ...mapActions(['fetchLists']),
    getData() {
      this.loading = true;
      this.fetchLists()
        .then((response) => {
          const { results } = response.data;
          if (results.length) {
            this.lists = results;
            this.total = response.data.total_results;
          } else this.error = 'No Results';
          this.loading = false;
        })
        .catch((err) => {
          this.error = 'Oops, something went wrong, try again';
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.gutter-example {
  text-align: center;
  min-height: 7rem;
}
</style>
