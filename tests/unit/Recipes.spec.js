import { shallowMount } from '@vue/test-utils';
import Recipes from '@/components/Recipes.vue';

describe('Recipes.vue', () => {
  it('renders props.recipes when passed', () => {
    const recipes = [{
      title: 'Pasta',
      instructions: 'Cook pasta and add sauce',
      imageUrl: 'https://static01.nyt.com/images/2016/08/15/dining/15COOKING-PASTA/15COOKING-PASTA-threeByTwoMediumAt2X-v2.jpg',
    }];
    const wrapper = shallowMount(Recipes, {
      propsData: { recipes },
    });
    expect(wrapper.text()).toMatch(recipes[0].title);
  });
});
