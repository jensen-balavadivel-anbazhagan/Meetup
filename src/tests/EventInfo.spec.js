import {shallowMount} from '@vue/test-utils';
import EventInfo from '@/views/EventInfo.vue';

describe('EventInfo.vue', () => {
    it('Should show name of chosen event', async () =>  {
        const wrapper = shallowMount(EventInfo, {
            global: {
                mocks: {
                    $route: {
                        params: { id:1 }
                    }
                }
            },
            propsData: {
                events : [{
                    Title: "Gothenburg Toastmasters - English-speaking club"
                }],
            }
        })
        const information = await wrapper.find('h2').text();
        const expected = 'Error'
        expect(information).toMatch(expected);
    }) 
    it('Should display the image of chosen event', () => {
        const wrapper = shallowMount(EventInfo);
        const image = wrapper.findAll('img');
        const expectedImages = 1;
        const actualImages = image.length;
        expect(actualImages).toBe(expectedImages);
    }) 
    it('Should have sign up btn', () => {
        const wrapper = shallowMount(EventInfo)

        const actual = wrapper.findAll('.addBtn')
        expect(actual).toBeTruthy();
    })

}) 