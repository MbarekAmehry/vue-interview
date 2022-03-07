import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Lists from '@/stubs/Lists.vue';
import Card from '@/stubs/Card.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Lists.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      fetchLists: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });
  it('renders lits when passed', () => {
    const wrapper = shallowMount(Lists, {
      store,
      localVue,
      data() {
        return {
          lists: [
            {
              id: 44,
              name: 'test',
              description: 'lorem',
            },
          ],
        };
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains(Card)).toBe(true);
    });
  });

  it('renders "No results" when passed', () => {
    const wrapper = shallowMount(Lists, {
      store,
      localVue,
      data() {
        return {
          lists: [],
          error: 'No Results',
        };
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains(Card)).toBe(false);
      expect(wrapper.vm.error).toEqual('No Results');
    });
  });

  it('renders "Oops! .." when passed', () => {
    const wrapper = shallowMount(Lists, {
      store,
      localVue,
      data() {
        return {
          lists: null,
          error: 'Oops, something went wrong, try again',
        };
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains(Card)).toBe(false);
      expect(wrapper.vm.error).toEqual('Oops, something went wrong, try again');
    });
  });
});
