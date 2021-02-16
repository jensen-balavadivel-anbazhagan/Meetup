import { shallowMount } from '@vue/test-utils';
import AboutText from '@/components/AboutText.vue'

describe('AboutText.vue', () => {
    it('should display h1 on mount', () => {
        const wrapper = shallowMount(AboutText);
        const heading1 = wrapper.find('h1');
        expect(heading1.exists()).toBe(true)
    })

    it('should display 1 image on mount', () => {
        const wrapper = shallowMount(AboutText);
        const image = wrapper.findAll('img');

        const expectedNumber = 1;
        const actualNumber = image.length;
        expect(actualNumber).toBe(expectedNumber);
    })
})